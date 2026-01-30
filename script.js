Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(resolve).catch(reject);
    }
  });
};

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let rejectCount = 0;

    for (let p of promises) {
      Promise.resolve(p)
        .then(resolve)
        .catch(() => {
          rejectCount++;
          if (rejectCount === promises.length) {
            reject("all promises rejected");
          }
        });
    }
  });
};

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let fulfilledCount = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = value;
          fulfilledCount++;

          if (fulfilledCount === promises.length) {
            resolve(results);
          }
        })
        .catch(err => {
          reject(err); // immediate rejection
        });
    });
  });
};

Promise.myAllSettled = function (promises) {
  return new Promise(resolve => {
    const results = new Array(promises.length);
    let settledCount = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = {
            status: "fulfilled",
            value: value
          };
        })
        .catch(error => {
          results[index] = {
            status: "rejected",
            error: error
          };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

// for your export requirement
function myRace(promises) {
  return Promise.myRace(promises);
}

function myAny(promises) {
  return Promise.myAny(promises);
}

function myAll(promises) {
  return Promise.myAll(promises);
}

function myAllSettled(promises) {
  return Promise.myAllSettled(promises);
}

module.exports = {
  myRace,
  myAny,
  myAll,
  myAllSettled
};
