const adjectives = ["Happy", "Quick", "Brave", "Silent", "Fuzzy"];
const animals = ["Lion", "Tiger", "Bear", "Elephant", "Monkey"];

export default function generateRandomName() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomAdjective}${randomAnimal}${randomNumber}`;
}
