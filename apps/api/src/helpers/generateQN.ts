const charactersLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charactersNumber = '0123456789';
const totalCombinations = charactersLetter.length * charactersNumber.length;
const eventIndices = new Map<number, number>();

function generateQN(index: number): string {
  if (index < 0 || index >= totalCombinations) {
    throw new Error('Index out of bounds');
  }

  const letterIndex = Math.floor(index / charactersNumber.length);
  const numberIndex = index % charactersNumber.length;

  return charactersLetter[letterIndex] + charactersNumber[numberIndex];
}

function getNextQN(eventId: number): string {
  let currentIndex = eventIndices.get(eventId) || 0;
  const qn = generateQN(currentIndex);
  currentIndex = (currentIndex + 1) % totalCombinations;
  eventIndices.set(eventId, currentIndex);
  return qn;
}

export default getNextQN;
