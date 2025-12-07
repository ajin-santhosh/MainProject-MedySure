/**
 * @typedef {Object} CalendarEvent
 * @property {string|number} id
 * @property {string} title

 * @property {string} start
 * @property {string} end
 */

/**
 * @param {{ calendarEvent: CalendarEvent }} props
 */
export default function CustomTimeGridEvent({ calendarEvent }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'green',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        border: '1px solid white',
        boxSizing: 'border-box',
      }}
    >
      {calendarEvent.title},
    </div>
  )
}
