/**
 * Service to interact directly with the Google Calendar API v3
 * using the authorized OAuth access token.
 */

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string; timeZone?: string };
  end: { dateTime?: string; date?: string; timeZone?: string };
  htmlLink?: string;
  hangoutLink?: string;
  conferenceData?: {
    entryPoints?: Array<{
      entryPointType: string;
      uri: string;
      label?: string;
    }>;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
    self?: boolean;
    organizer?: boolean;
  }>;
  status?: string;
}

export interface PrimaryCalendarInfo {
  id: string;
  summary: string;
  timeZone: string;
  description?: string;
}

export interface CreateStrategyEventParams {
  title: string;
  startDateTime: string; // ISO 8601 string
  endDateTime: string;   // ISO 8601 string
  timeZone: string;
  contactName: string;
  contactEmail: string;
  companyName?: string;
  headcountTier?: string;
  archetypeTitle?: string;
  overallScore?: number;
  priorityFocus?: string;
  includeGoogleMeet?: boolean;
}

/**
 * Fetch primary calendar details (time zone, title)
 */
export async function getPrimaryCalendar(accessToken: string): Promise<PrimaryCalendarInfo> {
  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to load Google Calendar profile: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * List upcoming events on primary calendar from now onwards
 */
export async function listUpcomingEvents(
  accessToken: string,
  timeMin?: string,
  maxResults: number = 10
): Promise<GoogleCalendarEvent[]> {
  const min = timeMin || new Date().toISOString();
  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  url.searchParams.set('timeMin', min);
  url.searchParams.set('maxResults', maxResults.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list Google Calendar events: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * Check if the user is busy during a given time range using the Google FreeBusy API
 */
export async function checkFreeBusy(
  accessToken: string,
  timeMin: string,
  timeMax: string
): Promise<{ isBusy: boolean; busyIntervals: Array<{ start: string; end: string }> }> {
  try {
    const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timeMin,
        timeMax,
        items: [{ id: 'primary' }]
      })
    });

    if (!response.ok) {
      return { isBusy: false, busyIntervals: [] };
    }

    const data = await response.json();
    const busy = data.calendars?.primary?.busy || [];
    return {
      isBusy: busy.length > 0,
      busyIntervals: busy
    };
  } catch (err) {
    console.warn('FreeBusy query fallback:', err);
    return { isBusy: false, busyIntervals: [] };
  }
}

/**
 * Create a Talent R.A.D.A.R. Priorities Calibration event on the user's Primary Google Calendar
 * with auto-generated Google Meet video conference, attendees, and full diagnostic agenda.
 */
export async function createStrategyCalibrationEvent(
  accessToken: string,
  params: CreateStrategyEventParams
): Promise<GoogleCalendarEvent> {
  const {
    title,
    startDateTime,
    endDateTime,
    timeZone,
    contactName,
    contactEmail,
    companyName = 'Organization',
    headcountTier,
    archetypeTitle,
    overallScore,
    priorityFocus,
    includeGoogleMeet = true
  } = params;

  const descriptionBody = [
    `✨ Ascend Marché · Talent R.A.D.A.R.™ Priorities Calibration (30-Minute Executive Session)`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Advisor: Trina Teo (Fractional CHRO | Ascend Marché Strategic HR Leadership)`,
    `Participant: ${contactName} <${contactEmail}>`,
    companyName ? `Company: ${companyName}` : '',
    headcountTier ? `Team Stage: ${headcountTier} employees` : '',
    archetypeTitle ? `Diagnosis Archetype: ${archetypeTitle} (Score: ${overallScore ?? 'N/A'}/100)` : '',
    priorityFocus ? `Primary Focus Dimension: ${priorityFocus}` : '',
    ``,
    `CALIBRATION AGENDA (Zero Hard Sell):`,
    `1. Interpret Diagnostic Findings — Evaluate structural gaps against benchmark peer scaling companies.`,
    `2. Immediate DIY Workforce Intervention — Flesh out 1 priority action your team can execute internally this week.`,
    `3. Strategic Options Review — Determine whether your current phase calls for fractional HR leadership or manager coaching.`,
    ``,
    `Direct Inquiries: engage@ascendmarche.com | WhatsApp: +65 9685 2943`,
    `Ascend Marché Portal: https://www.ascendmarche.com`
  ].filter(Boolean).join('\n');

  const attendeesList: Array<{ email: string; displayName?: string }> = [
    { email: 'engage@ascendmarche.com', displayName: 'Ascend Marché (Trina Teo)' }
  ];

  if (contactEmail && !attendeesList.some(a => a.email.toLowerCase() === contactEmail.toLowerCase())) {
    attendeesList.push({
      email: contactEmail,
      displayName: contactName || undefined
    });
  }

  const payload: any = {
    summary: title || `Ascend Marché · Talent R.A.D.A.R.™ Calibration (${contactName || companyName})`,
    description: descriptionBody,
    start: {
      dateTime: startDateTime,
      timeZone: timeZone || 'Asia/Singapore'
    },
    end: {
      dateTime: endDateTime,
      timeZone: timeZone || 'Asia/Singapore'
    },
    attendees: attendeesList,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 15 },
        { method: 'email', minutes: 60 }
      ]
    }
  };

  if (includeGoogleMeet) {
    payload.conferenceData = {
      createRequest: {
        requestId: `ascend-marche-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    };
  }

  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  if (includeGoogleMeet) {
    url.searchParams.set('conferenceDataVersion', '1');
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Google Calendar event: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * Delete an event from primary calendar (requires explicit user confirmation in UI)
 */
export async function deleteCalendarEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok && response.status !== 404 && response.status !== 410) {
    const errorText = await response.text();
    throw new Error(`Failed to remove Google Calendar event: ${response.status} ${errorText}`);
  }
}
