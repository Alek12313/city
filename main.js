const city = [];

let crId = -1;

const r = (m) => Math.floor(Math.random() * Math.floor(m));

const savingThrow = (difficult, val) => difficult < val;

const creatures = (n) => Array.apply(null, { length: n })
  .map(() => ({ id: ++crId, name: Date.now().toString(16), life: 100}));

const die = (el, yes) => { if (!yes) city[el.id].life = 0 };
const work = (el, yes) => { if (yes) city[el.id].life -= r(100) };
const eat = (el, yes) => { if (yes) city[el.id].life += r(20) };
const grave = (el) => { if (el.life <= 0 && !city[el.id].dead) city[el.id].dead = true };

const live = () => {
  city.push(...creatures(r(10)));

  Promise.all(city.map(el => {
    if (!el.dead) {
      work(el, savingThrow(1, r(3)));
      die(el, savingThrow(1, r(100)));
      eat(el, savingThrow(1, r(3)));
      die(el, savingThrow(1, r(50)));
    }
  }));

  city.forEach(el => grave(el));

  console.log(city);
  // console.log(city.filter(el => !el.dead));
}

live();
setInterval(() => live(), 4000);
