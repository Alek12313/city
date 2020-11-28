const crypto = require('crypto');

const city = [];

let day = 0;

const r = (m) => Math.floor(Math.random() * Math.floor(m));

const savingThrow = (difficult, val) => difficult < val;
const name = () => crypto.randomBytes(42).toString('hex');
const nameShorter = () => city.map(el => ({ ...el, name: el.name.substring(4, 20) }));
const id = (creature) => city.findIndex(el => el.name === creature.name);

const creatures = (n) => Array.apply(null, { length: n })
  .map(() => ({ name: name(), hp: 100 }));

const survive = (el, yes) => { if (!yes) city[id(el)].hp = 0 };
const work = (el, yes) => { if (yes) city[id(el)].hp -= r(42) };
const eat = (el, yes) => { if (yes) city[id(el)].hp += r(24) };

const bury = (el) => { if (el.hp <= 0 && !city[id(el)].dead) city[id(el)].dead = true };
const LifeRound = (el) => { if (el.hp > 100 && !city[id(el)].dead) city[id(el)].hp = 100 };

const live = () => {
  // day++; // FOR CONTINUOUS
  city.push(...creatures(r(8)));

  // START OF THE DAY, MAIN WORK
  Promise.all(city.map(el => {
    if (!el.dead) {
      work(el, savingThrow(1, r(3)));
      survive(el, savingThrow(1, r(100)));
      eat(el, savingThrow(1, r(4)));
      survive(el, savingThrow(1, r(80)));
    }
  }));

  // END OF THE DAY, SUMMARY
  Promise.all(city.map(el => {
    bury(el);
    LifeRound(el);
  }));

  const dead = nameShorter().filter(el => el.dead);
  const alive = nameShorter().filter(el => !el.dead);

  console.log(`DAY: ${day + 1} | DEAD: ${dead.length} | ALIVE: ${alive.length}`);
  console.table(alive);
  console.log ('');
}

for (; day < 42; day++) {
  live();
}
// setInterval(() => live(), 100); // FOR CONTINUOUS
