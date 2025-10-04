// Check win
export function getWinMessage(messages: any[]): string | null {
  for (const msg of messages) {
    for (const part of msg.parts) {
      if (part.type === "tool-CalmedDown") {
        return "Congratulations, You Calmed Your Therapist Down!";
      }
      if (part.type === "tool-Psychosis") {
        return "Congratulations, You Drove Your Therapist Crazy!";
      }
    }
  }
  return null;
}
