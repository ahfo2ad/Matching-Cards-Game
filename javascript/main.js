

document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("what is your name?");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = "Unknown";
    }
    else {

        document.querySelector(".name span").innerHTML = yourName;
    }
    document.getElementById("hello").play();

    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];    // التلات نقط دول عشان يظهرلى اللى جوا الاراى نفسه   

// let orderRange = Array.from(Array(blocks.length).keys());    بتساوى اللى فوقها 
// console.log(orderRange);  // just for test

shuffle(orderRange);  // calling function shuffle

// console.log(orderRange);     // just for test


blocks.forEach((block, index) => {

    // console.log(index);
    block.style.order = orderRange[index];

    block.addEventListener("click", function () {

        flipblock(block);

    });

});

// flip block function

function flipblock(selectedBlock) {

    selectedBlock.classList.add("is-flipped");

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (allFlippedBlocks.length == 2) {


        stopClicking();

        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

//stop clicking function 

function stopClicking() {

    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

        blocksContainer.classList.remove("no-clicking");  

    }, duration);
}

//  check matched function

function checkMatched (firstBlock, secondBlock) {

    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();
    }
    else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) +1;

        setTimeout(() => {

            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped"); 

        }, duration);

        document.getElementById("Fail").play();

        
    }

}


// shuffle function 

function shuffle(array) {

    let current = array.length,

        temp,       // temporary value

        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

        // console.log(random);
    }  
    
    return array;
}

