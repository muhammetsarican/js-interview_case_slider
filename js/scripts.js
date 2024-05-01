const prevButton = document.querySelector("#prevBtn")
const nextButton = document.querySelector("#nextBtn")

const imageList = [...document.querySelectorAll(".sliderBox>img")];

const widthValue = imageList[0].clientWidth;

const initiateSlider = () => {
    imageList.reverse().reduce((prev, image) => {
        if (prev.style.left.length == 0) prev.style.left = 0;

        const leftValue = prev.style.left.length === 0 ? widthValue : parseInt(prev.style.left.slice(0, -2)) + widthValue

        image.style.left = `${leftValue}px`;

        return image;
    })
}

initiateSlider();



function checkAnyLeftZero(operation) {
    let isThereAnyLeftZero = false;

    switch (operation) {
        case "+":
            imageList.map((image) => {
                if (parseInt(image.style.left.slice(0, -2)) + widthValue == 0) isThereAnyLeftZero = true;
                if (nextButton.disabled) nextButton.disabled = false;
            });
            if (!isThereAnyLeftZero) prevButton.disabled = true;
            break;

        case "-":
            imageList.map((image) => {
                if (parseInt(image.style.left.slice(0, -2)) - widthValue == 0) isThereAnyLeftZero = true;
                if (prevButton.disabled) prevButton.disabled = false;
            });
            if (!isThereAnyLeftZero) nextButton.disabled = true;
            break;
    }

    return isThereAnyLeftZero;
}

function changePositionsForPrev() {
    if (checkAnyLeftZero("+")) {
        imageList.map((image) => {
            const imageWidthValue = parseInt(image.style.left.slice(0, -2));
            image.style.left = `${imageWidthValue + widthValue}px`;
        })
    }
}
function changePositionsForNext() {
    if (checkAnyLeftZero("-")) {
        imageList.map((image) => {
            const imageWidthValue = parseInt(image.style.left.slice(0, -2));
            image.style.left = `${imageWidthValue - widthValue}px`;
        })
    }
}
prevButton.addEventListener("click", () => {
    changePositionsForPrev()
})
nextButton.addEventListener("click", () => {
    changePositionsForNext()
})