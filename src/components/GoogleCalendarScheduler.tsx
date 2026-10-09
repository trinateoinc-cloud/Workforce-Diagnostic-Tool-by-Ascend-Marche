import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Sparkles,
  Info,
  CalendarCheck,
  RefreshCw,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  logout,
  getCurrentUser
} from '../services/calendarAuth';
import {
  GoogleCalendarEvent,
  PrimaryCalendarInfo,
  getPrimaryCalendar,
  listUpcomingEvents,
  checkFreeBusy,
  createStrategyCalibrationEvent,
  deleteCalendarEvent
} from '../services/googleCalendarService';
import { GoogleSignInButton } from './GoogleSignInButton';
import { UserContact } from '../types/diagnostic';

interface GoogleCalendarSchedulerProps {
  contact?: UserContact;
  archetypeTitle?: string;
  overallScore?: number;
  priorityFocus?: string;
  onScheduledSuccess?: (event: GoogleCalendarEvent) => void;
}

export const GoogleCalendarScheduler: React.FC<GoogleCalendarSchedulerProps> = ({
  contact,
  archetypeTitle,
  overallScore,
  priorityFocus,
  onScheduledSuccess
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Calendar data
  const [calendarInfo, setCalendarInfo] = useState<PrimaryCalendarInfo | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<GoogleCalendarEvent[]>([]);
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  // Booking form state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [sessionDuration, setSessionDuration] = useState<number>(30); // 30 min default
  const [isBusySlot, setIsBusySlot] = useState(false);
  const [checkingBusy, setCheckingBusy] = useState(false);

  // Destructive / Mutating Confirmation Dialog States (Mandatory requirement)
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<GoogleCalendarEvent | null>(null);

  const [eventToDelete, setEventToDelete] = useState<GoogleCalendarEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      async (user, token) => {
        setCurrentUser(user);
        if (token) {
          setAccessToken(token);
          loadCalendarData(token);
        } else {
          // Check if token exists in memory
          const memToken = await getAccessToken();
          if (memToken) {
            setAccessToken(memToken);
            loadCalendarData(memToken);
          }
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setCalendarInfo(null);
        setUpcomingEvents([]);
      }
    );
    return () => unsubscribe();
  }, []);

  // Compute next 7 business days for quick selection
  const businessDays = React.useMemo(() => {
    const days: Array<{ label: string; dateStr: string; dayName: string }> = [];
    const current = new Date();
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (days.length < 6) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Monday to Friday
        const dateStr = current.toISOString().split('T')[0];
        const label = current.toLocaleDateString('en-GB', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        const dayName = current.toLocaleDateString('en-GB', { weekday: 'long' });
        days.push({ label, dateStr, dayName });
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, []);

  // Set default selected date
  useEffect(() => {
    if (!selectedDate && businessDays.length > 0) {
      setSelectedDate(businessDays[0].dateStr);
    }
  }, [businessDays, selectedDate]);

  // Load calendar profile and events
  const loadCalendarData = async (token: string) => {
    setLoadingCalendar(true);
    setAuthError(null);
    try {
      const [cal, events] = await Promise.all([
        getPrimaryCalendar(token).catch(err => {
          console.warn('Failed to load primary calendar info:', err);
          return null;
        }),
        listUpcomingEvents(token, new Date().toISOString(), 15).catch(err => {
          console.warn('Failed to list events:', err);
          return [];
        })
      ]);

      if (cal) setCalendarInfo(cal);
      setUpcomingEvents(events);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to sync with Google Calendar.');
    } finally {
      setLoadingCalendar(false);
    }
  };

  // Sign in handler
  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        await loadCalendarData(result.accessToken);
      }
    } catch (err: any) {
      console.error('Google Calendar sign-in failed:', err);
      setAuthError(err.message || 'Google sign-in was interrupted or declined.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Logout handler
  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setCalendarInfo(null);
    setUpcomingEvents([]);
    setCreatedEvent(null);
  };

  // FreeBusy check when selected date or time changes
  useEffect(() => {
    if (!accessToken || !selectedDate || !selectedTime) return;

    const checkSlot = async () => {
      setCheckingBusy(true);
      try {
        const startISO = `${selectedDate}T${selectedTime}:00Z`;
        const startObj = new Date(`${selectedDate}T${selectedTime}:00`);
        const endObj = new Date(startObj.getTime() + sessionDuration * 60000);

        const { isBusy } = await checkFreeBusy(
          accessToken,
          startObj.toISOString(),
          endObj.toISOString()
        );
        setIsBusySlot(isBusy);
      } catch {
        setIsBusySlot(false);
      } finally {
        setCheckingBusy(false);
      }
    };

    checkSlot();
  }, [accessToken, selectedDate, selectedTime, sessionDuration]);

  // Standard strategic time slots (Singapore / Executive business hours)
  const availableSlots = [
    { time: '09:30', label: '09:30 AM' },
    { time: '11:00', label: '11:00 AM' },
    { time: '14:00', label: '02:00 PM' },
    { time: '15:30', label: '03:30 PM' },
    { time: '17:00', label: '05:00 PM' }
  ];

  // Initiate confirmation modal (Mandatory User Confirmation dialog)
  const handlePromptScheduleConfirmation = () => {
    setAuthError(null);
    setShowConfirmModal(true);
  };

  // Perform event creation after user explicitly clicks Confirm in modal
  const handleExecuteCalendarBooking = async () => {
    if (!accessToken) return;
    setIsSubmittingBooking(true);
    setAuthError(null);

    try {
      const startObj = new Date(`${selectedDate}T${selectedTime}:00`);
      const endObj = new Date(startObj.getTime() + sessionDuration * 60000);
      const userTimeZone =
        calendarInfo?.timeZone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        'Asia/Singapore';

      const created = await createStrategyCalibrationEvent(accessToken, {
        title: `Ascend Marché · Talent R.A.D.A.R.™ Calibration (${contact?.companyName || contact?.firstName || 'Executive'})`,
        startDateTime: startObj.toISOString(),
        endDateTime: endObj.toISOString(),
        timeZone: userTimeZone,
        contactName: contact?.firstName || currentUser?.displayName || 'Executive Leader',
        contactEmail: contact?.email || currentUser?.email || '',
        companyName: contact?.companyName,
        headcountTier: contact?.headcountTier,
        archetypeTitle,
        overallScore,
        priorityFocus,
        includeGoogleMeet: true
      });

      setCreatedEvent(created);
      setShowConfirmModal(false);
      if (onScheduledSuccess) {
        onScheduledSuccess(created);
      }

      // Refresh upcoming events
      await loadCalendarData(accessToken);
    } catch (err: any) {
      console.error('Failed to create calendar event:', err);
      setAuthError(err.message || 'Failed to schedule event on your Google Calendar.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Execute deletion after user explicitly clicks Confirm in deletion modal
  const handleExecuteDeleteEvent = async () => {
    if (!accessToken || !eventToDelete) return;
    setIsDeleting(true);
    try {
      await deleteCalendarEvent(accessToken, eventToDelete.id);
      setEventToDelete(null);
      if (createdEvent?.id === eventToDelete.id) {
        setCreatedEvent(null);
      }
      await loadCalendarData(accessToken);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to delete event from Google Calendar.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter existing Ascend Marché sessions from upcoming events
  const ascendMarcheEvents = upcomingEvents.filter(e =>
    e.summary?.toLowerCase().includes('ascend') ||
    e.summary?.toLowerCase().includes('radar') ||
    e.summary?.toLowerCase().includes('calibration')
  );

  return (
    <div className="space-y-6">
      {/* Google Calendar Connection Bar */}
      <div className="p-4 sm:p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none bg-[#141651]/5 border border-[rgba(212,175,55,0.40)] flex items-center justify-center shrink-0">
            <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-label-btn text-[#141651]">Google Calendar Integration</span>
              {accessToken ? (
                <span className="text-3xs font-label-btn px-2 py-0.5 border border-[#34A853]/40 text-[#141651] bg-[#34A853]/10">
                  Connected
                </span>
              ) : (
                <span className="text-3xs font-label-btn px-2 py-0.5 border border-[#5E6088]/30 text-[#5E6088]">
                  Not Connected
                </span>
              )}
            </div>
            <p className="text-2xs text-[#5E6088] font-light">
              {currentUser
                ? `Authorized for ${currentUser.email} · Time Zone: ${calendarInfo?.timeZone || 'Detected'}`
                : 'Directly schedule strategy sessions and sync Google Meet invites with Trina Teo.'}
            </p>
          </div>
        </div>

        {currentUser && accessToken ? (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => loadCalendarData(accessToken)}
              disabled={loadingCalendar}
              className="p-2 border border-[rgba(212,175,55,0.30)] text-[#141651] hover:text-[#D4AF37] transition-colors cursor-pointer"
              title="Refresh Google Calendar"
              aria-label="Refresh calendar"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingCalendar ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[rgba(212,175,55,0.30)] text-2xs font-label-btn text-[#5E6088] hover:text-[#141651] hover:border-[#141651] transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Disconnect</span>
            </button>
          </div>
        ) : (
          <div className="self-end sm:self-auto">
            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              isLoading={isAuthenticating}
              text="Connect Google Calendar"
            />
          </div>
        )}
      </div>

      {authError && (
        <div className="p-3 bg-red-50/50 border border-red-300 text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <span className="font-medium mr-1">Notice:</span>
            <span>{authError}</span>
          </div>
        </div>
      )}

      {/* Unauthenticated View: Explanatory Card */}
      {!accessToken && (
        <div className="p-6 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-none bg-[#141651] flex items-center justify-center text-[#D4AF37]">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h4 className="text-base font-normal font-heading text-[#141651]">
              Schedule Directly to Your Google Calendar
            </h4>
            <p className="text-xs text-[#5E6088] font-light leading-relaxed">
              Connect your Google Calendar with permission to automatically create a 30-minute Priorities Calibration invite with Trina Teo, check your availability for zero scheduling friction, and auto-generate a private Google Meet video conference.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              isLoading={isAuthenticating}
              text="Sign in with Google to Schedule"
            />
          </div>

          <div className="flex items-center justify-center gap-4 text-3xs font-label-btn text-[#5E6088] pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Explicit Confirmation Required
            </span>
            <span aria-hidden="true">·</span>
            <span>Google Meet Included</span>
            <span aria-hidden="true">·</span>
            <span>Instant Calendar Sync</span>
          </div>
        </div>
      )}

      {/* Authenticated Scheduling Form */}
      {accessToken && (
        <div className="space-y-6">
          {/* Success Banner if Event Just Created */}
          {createdEvent && (
            <div className="p-5 bg-[rgba(212,175,55,0.08)] border border-[#D4AF37] space-y-3 animate-fadeIn">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-label-btn text-[#141651]">
                      Calibrated Session Added to Your Google Calendar!
                    </h4>
                    <p className="text-xs text-[#5E6088] font-light">
                      {createdEvent.summary}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCreatedEvent(null)}
                  className="text-[#5E6088] hover:text-[#141651] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {createdEvent.htmlLink && (
                  <a
                    href={createdEvent.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-2xs font-label-btn btn-main flex items-center gap-1.5 cursor-pointer"
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>View in Google Calendar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {createdEvent.hangoutLink && (
                  <a
                    href={createdEvent.hangoutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-2xs font-label-btn btn-secondary-light flex items-center gap-1.5 cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5 text-[#141651]" />
                    <span>Open Google Meet Video Room</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Date & Time Picker */}
          <div className="bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] p-6 space-y-5">
            <div>
              <h4 className="text-sm font-label-btn text-[#141651] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                Select Preferred Date & Executive Time Slot
              </h4>
              <p className="text-xs text-[#5E6088] font-light">
                Sessions are 30 minutes with Fractional CHRO Trina Teo.
              </p>
            </div>

            {/* Date Select Grid */}
            <div className="space-y-2">
              <label className="text-2xs font-label-btn text-[#5E6088]">
                1. Select Working Day
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {businessDays.map(day => {
                  const isSelected = selectedDate === day.dateStr;
                  return (
                    <button
                      key={day.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(day.dateStr)}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#141651] text-[#FFFEFA]'
                          : 'border-[rgba(212,175,55,0.30)] bg-transparent text-[#141651] hover:border-[#141651]'
                      }`}
                    >
                      <div className={`text-3xs font-label-btn ${isSelected ? 'text-[#D4AF37]' : 'text-[#5E6088]'}`}>
                        {day.dayName}
                      </div>
                      <div className="text-xs font-medium mt-0.5">
                        {day.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-2xs font-label-btn text-[#5E6088]">
                  2. Select Executive Time Window (SGT / {calendarInfo?.timeZone || 'Local'})
                </label>
                {checkingBusy && (
                  <span className="text-3xs text-[#5E6088] flex items-center gap-1 font-light">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Checking conflict...
                  </span>
                )}
                {!checkingBusy && isBusySlot && (
                  <span className="text-3xs text-[#141651] font-medium flex items-center gap-1">
                    <Info className="w-3 h-3 text-[#D4AF37]" /> Busy on your calendar
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {availableSlots.map(slot => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2.5 px-3 text-center border text-xs font-label-btn transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#FFFEFA]'
                          : 'border-[rgba(212,175,55,0.30)] bg-transparent text-[#141651] hover:border-[#141651]'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Attendee Confirmation Summary */}
            <div className="p-4 bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.25)] space-y-2 text-xs">
              <div className="font-label-btn text-[#141651]">Calibration Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5E6088] font-light">
                <div>
                  <span className="text-[#141651] font-medium mr-1">Date & Time:</span>
                  {selectedDate} at {selectedTime} ({calendarInfo?.timeZone || 'Local'})
                </div>
                <div>
                  <span className="text-[#141651] font-medium mr-1">Attendees:</span>
                  {currentUser?.email}, Trina Teo, engage@ascendmarche.com
                </div>
                <div>
                  <span className="text-[#141651] font-medium mr-1">Video:</span>
                  Google Meet (Auto-generated)
                </div>
                <div>
                  <span className="text-[#141651] font-medium mr-1">Diagnostic Context:</span>
                  {archetypeTitle || 'Workforce Priorities'}
                </div>
              </div>
            </div>

            {/* Schedule CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePromptScheduleConfirmation}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-4 text-xs font-label-btn btn-main flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CalendarCheck className="w-4 h-4 text-[#FFFEFA]" />
                <span>Confirm & Schedule to My Google Calendar</span>
              </button>
              <p className="text-3xs text-center text-[#5E6088] font-light mt-2">
                A confirmation modal will appear before any event is saved to your calendar.
              </p>
            </div>
          </div>

          {/* Existing Ascend Marché Sessions on Calendar */}
          {ascendMarcheEvents.length > 0 && (
            <div className="bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] p-6 space-y-4">
              <h4 className="text-xs font-label-btn text-[#141651] flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                Your Scheduled Ascend Marché Calibrations ({ascendMarcheEvents.length})
              </h4>

              <div className="space-y-3">
                {ascendMarcheEvents.map(evt => {
                  const startTimeStr = evt.start?.dateTime
                    ? new Date(evt.start.dateTime).toLocaleString('en-GB', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : evt.start?.date || 'Scheduled';

                  return (
                    <div
                      key={evt.id}
                      className="p-4 border border-[rgba(212,175,55,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-[#141651]">{evt.summary}</div>
                        <div className="text-2xs text-[#5E6088] flex items-center gap-2 font-light">
                          <span>{startTimeStr}</span>
                          {evt.hangoutLink && (
                            <>
                              <span aria-hidden="true">·</span>
                              <a
                                href={evt.hangoutLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#D4AF37] hover:underline flex items-center gap-1"
                              >
                                <Video className="w-3 h-3" />
                                <span>Join Meet</span>
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {evt.htmlLink && (
                          <a
                            href={evt.htmlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 text-3xs font-label-btn btn-secondary-light flex items-center gap-1"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => setEventToDelete(evt)}
                          className="px-2.5 py-1.5 text-3xs font-label-btn text-red-600 border border-red-200 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Remove event from Google Calendar"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          <span>Cancel Event</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION MODAL FOR SCHEDULING (Workspace Skill Requirement) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
          <div className="bg-[#FFFEFA] max-w-lg w-full p-6 sm:p-8 border border-[rgba(212,175,55,0.40)] relative shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-xs font-label-btn text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Confirm Calendar Event Creation</span>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="text-[#5E6088] hover:text-[#141651] p-1 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-normal font-heading text-[#141651]">
                Add Calibration Session to Your Google Calendar?
              </h3>
              <p className="text-xs text-[#5E6088] font-light leading-relaxed">
                With your explicit permission, the following appointment and video link will be written to your primary Google Calendar:
              </p>

              <div className="p-4 bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.20)] text-xs space-y-2">
                <div>
                  <strong className="text-[#141651] font-medium block">Title:</strong>
                  Ascend Marché · Talent R.A.D.A.R.™ Priorities Calibration
                </div>
                <div>
                  <strong className="text-[#141651] font-medium block">Date & Time:</strong>
                  {selectedDate} at {selectedTime} ({calendarInfo?.timeZone || 'Local'}) · 30 Minutes
                </div>
                <div>
                  <strong className="text-[#141651] font-medium block">Attendees:</strong>
                  {currentUser?.email}, Trina Teo (trina@ascendmarche.com), engage@ascendmarche.com
                </div>
                <div>
                  <strong className="text-[#141651] font-medium block">Target Calendar:</strong>
                  Primary Calendar ({calendarInfo?.id || currentUser?.email})
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleExecuteCalendarBooking}
                disabled={isSubmittingBooking}
                className="w-full sm:flex-1 py-3 text-xs font-label-btn btn-main cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmittingBooking ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Writing to Google Calendar...</span>
                  </>
                ) : (
                  <span>Yes, Add to My Google Calendar</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmittingBooking}
                className="w-full sm:w-auto py-3 px-5 text-xs font-label-btn btn-secondary-light cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION MODAL FOR DELETING (Workspace Skill Requirement) */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
          <div className="bg-[#FFFEFA] max-w-md w-full p-6 sm:p-8 border border-red-300 relative shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-label-btn text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>Confirm Event Deletion</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-normal font-heading text-[#141651]">
                Remove Event from Google Calendar?
              </h3>
              <p className="text-xs text-[#5E6088] font-light leading-relaxed">
                Are you sure you want to delete <strong className="text-[#141651] font-medium">"{eventToDelete.summary}"</strong> from your Google Calendar? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleExecuteDeleteEvent}
                disabled={isDeleting}
                className="w-full sm:flex-1 py-3 text-xs font-label-btn bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting Event...</span>
                  </>
                ) : (
                  <span>Confirm Delete</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                disabled={isDeleting}
                className="w-full sm:w-auto py-3 px-5 text-xs font-label-btn btn-secondary-light cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
