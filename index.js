
const arr = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

let rabbit = {};
let wolf = {};
let home = {};
let fence = {};

while (JSON.stringify(rabbit) === JSON.stringify(wolf) || JSON.stringify(wolf) == JSON.stringify(home) || JSON.stringify(rabbit) == JSON.stringify(home)) {
    console.log("again")
    rabbit = {
        x: Math.floor(Math.random() * (arr.length - 1)),
        y: Math.floor(Math.random() * (arr.length - 1))
    };
    wolf = {
        x: Math.floor(Math.random() * (arr.length - 1)),
        y: Math.floor(Math.random() * (arr.length - 1))
    };
    home = {
        x: Math.floor(Math.random() * (arr.length - 1)),
        y: Math.floor(Math.random() * (arr.length - 1))
    };
    fence = {
        x: Math.floor(Math.random() * (arr.length - 1)),
        y: Math.floor(Math.random() * (arr.length - 1))
    };
}

console.log(rabbit, wolf, home, fence)

createTrellis(arr, rabbit, wolf, home, fence);

function createTrellis(arr, rabbit, wolf, home, fence) {
    const root = document.getElementById("root");
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let cub;
            if (i === rabbit.x && j === rabbit.y) {
                cub = `<div class="cub" ><img src="./rabbit.png"</div>`;
            }
            else if (i === wolf.x && j === wolf.y) {
                cub = `<div class="cub" ><img src="./wolf.png"></div>`;
            } else if (i == home.x && j == home.y) {
                cub = `<div class="cub" ><img src="./home.png"></div>`;
            } else if (i == fence.x && j == fence.y) {
                cub = `<div class="cub"><img src="./fence.png"></div>`;
            }
            else {
                cub = `<div class="cub" ></div>`
            }
            // else if (i === wolf.x && j === wolf.y) {
            //     cub = `<div class="cub" ><img src="./wolf.png"></div>`;
            // } else {
            //     cub = ""
            // }

            root.innerHTML += cub;
        }
    }
    if (JSON.stringify(rabbit) === JSON.stringify(home)) {
        alert("you Win");
        location.reload();
        // return
    }
    if (JSON.stringify(rabbit) === JSON.stringify(wolf)) {
        alert("You Lose");
        location.reload();
        return
    }
    // arr[wolf.x][wolf.y] = 10;

}
function clearTrellis() {
    root.innerHTML = "";
}

function go(type) {
    const oldRabbitPosition = { x: rabbit.x, y: rabbit.y };
    if (type == "left") {
        rabbit.y === 0 ? rabbit.y = arr[0].length - 1 : rabbit.y -= 1;
    } else if (type == "right") {
        rabbit.y === arr[0].length - 1 ? rabbit.y = 0 : rabbit.y += 1

    } else if (type == "top") {
        rabbit.x === 0 ? rabbit.x = arr.length - 1 : rabbit.x -= 1;
    } else {
        if (type == "bottom") {
            rabbit.x === arr.length - 1 ? rabbit.x = 0 : rabbit.x += 1;
        }
    }

    if (JSON.stringify(fence) === JSON.stringify(rabbit)) {
        rabbit.x = oldRabbitPosition.x;
        rabbit.y = oldRabbitPosition.y;
    }
    console.log(rabbit, "nap");

    const bottomVariant = {
        x: wolf.x + 1,
        y: wolf.y
    }
    const topVariant = {
        x: wolf.x - 1,
        y: wolf.y
    }
    const rightVariant = {
        x: wolf.x,
        y: wolf.y + 1
    }
    const leftVariant = {
        x: wolf.x,
        y: wolf.y - 1
    }
    console.log(topVariant);
    console.log(rightVariant);
    console.log(bottomVariant);
    console.log(leftVariant);
    let topIsValid = true, rightIsValid = true, bottomIsValid = true, leftIsValid = true;


    if (JSON.stringify(topVariant) === JSON.stringify(home) || JSON.stringify(topVariant) === JSON.stringify(fence)) {
        topIsValid = false;
    }
    if (JSON.stringify(rightVariant) === JSON.stringify(home) || JSON.stringify(rightVariant) === JSON.stringify(fence)) {
        rightIsValid = false;
    }
    if (JSON.stringify(bottomVariant) === JSON.stringify(home) || JSON.stringify(bottomVariant) === JSON.stringify(fence)) {
        bottomIsValid = false;
    }
    if (JSON.stringify(leftVariant) === JSON.stringify(home) || JSON.stringify(leftVariant) === JSON.stringify(fence)) {
        leftIsValid = false;
    }
    // if (arr[topVariant.x][topVariant.y]) {
    //     topIsValid = true;
    // } else {
    //     topIsValid = false;
    // }
    // if (arr[rightVariant.x][rightVariant.y]) {
    //     rightIsValid = true;
    // } else {
    //     rightIsValid = false;
    // }
    // if (arr[bottomVariant.x][bottomVariant.y]) {
    //     bottomIsValid = true;
    // } else {
    //     bottomIsValid = false;
    // }
    // if (arr[leftVariant.x][leftVariant.y]) {
    //     leftIsValid = true;
    // } else {
    //     leftIsValid = false;
    // }

    // const topIsValid = arr[topVariant.x][topVariant.y] ? true:false;
    // const rightIsValid = arr[rightVariant.x][rightVariant.y] !== undefined ? true : false;
    // const bottomIsValid = arr[bottomVariant.x][bottomVariant.y] !== undefined ? true : false;
    // const leftIsValid = arr[leftVariant.x][leftVariant.y] !== undefined ? true : false;
    const linesArray = [];

    topIsValid && linesArray.push({
        name: "top",
        line: Math.sqrt(((topVariant.x - rabbit.x) * (topVariant.x - rabbit.x)) + ((topVariant.y - rabbit.y) * (topVariant.y - rabbit.y)))
    })
    rightIsValid && linesArray.push({
        name: "right",
        line: Math.sqrt(((rightVariant.x - rabbit.x) * (rightVariant.x - rabbit.x)) + ((rightVariant.y - rabbit.y) * (rightVariant.y - rabbit.y)))
    })
    bottomIsValid && linesArray.push({
        name: "bottom",
        line: Math.sqrt(((bottomVariant.x - rabbit.x) * (bottomVariant.x - rabbit.x)) + ((bottomVariant.y - rabbit.y) * (bottomVariant.y - rabbit.y)))
    })
    leftIsValid && linesArray.push({
        name: "left",
        line: Math.sqrt(((leftVariant.x - rabbit.x) * (leftVariant.x - rabbit.x)) + ((leftVariant.y - rabbit.y) * (leftVariant.y - rabbit.y)))
    })

    console.log("========================");
    // console.log(Math.sqrt(((topVariant.x - rabbit.x) * (topVariant.x - rabbit.x)) + ((topVariant.y - rabbit.y) * (topVariant.y - rabbit.y))))
    // console.log(Math.sqrt(((rightVariant.x - rabbit.x) * (rightVariant.x - rabbit.x)) + ((rightVariant.y - rabbit.y) * (rightVariant.y - rabbit.y))));
    // console.log(Math.sqrt(((bottomVariant.x - rabbit.x) * (bottomVariant.x - rabbit.x)) + ((bottomVariant.y - rabbit.y) * (bottomVariant.y - rabbit.y))));
    // console.log(Math.sqrt(((leftVariant.x - rabbit.x) * (leftVariant.x - rabbit.x)) + ((leftVariant.y - rabbit.y) * (leftVariant.y - rabbit.y))));
    linesArray.forEach(el => {
        console.log(el)
    })
    let min = linesArray.reduce((prev, curr) => prev.line <= curr.line ? prev : curr);
    console.log(min, "min");
    clearTrellis();
    createTrellis(arr, rabbit, wolf, home, fence);

    return min.name
}

function goWolf(type) {
    if (type == "left") {
        wolf.y === 0 ? wolf.y = arr[0].length - 1 : wolf.y -= 1;
    } else if (type == "right") {
        wolf.y === arr[0].length - 1 ? wolf.y = 0 : wolf.y += 1

    } else if (type == "top") {
        wolf.x === 0 ? wolf.x = arr.length - 1 : wolf.x -= 1;
    } else {
        if (type == "bottom") {
            wolf.x === arr.length - 1 ? wolf.x = 0 : wolf.x += 1;
        }
    }
    clearTrellis();
    createTrellis(arr, rabbit, wolf, home, fence);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) {
        const resultToGo = go("top");
        goWolf(resultToGo);

    }
    else if (e.keyCode === 40) {

        const resultToGo = go("bottom");
        goWolf(resultToGo);

    } else if (e.keyCode === 37) {
        const resultToGo = go("left");
        goWolf(resultToGo);

    } else {
        if (e.keyCode === 39) {
            const resultToGo = go("right");
            goWolf(resultToGo);
        }
    }
})



