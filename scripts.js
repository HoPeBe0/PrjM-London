const headerBackgroundImageChildrenListHTML = document.querySelector(".background-images").children;
let headerBackgroundImageChildrenList = [];

const main = document.querySelector(".main-content");
const days = document.querySelector(".days");

let nextButton = {
    object: document.querySelector(`.next-image`),
    rotation: 0,
};
let previousButton = {
    object: document.querySelector(`.previous-image`),
    rotation: 0,
};


// Convert HTML List to JS Array and assigning an index to the objects
for (i = 0; headerBackgroundImageChildrenListHTML.length > i; i++) {
    let image = {
        object: headerBackgroundImageChildrenListHTML[i],
        index: i
    };
    headerBackgroundImageChildrenList.push(image);
}

// Set up a line of images off viewport, later they can be pulled in simply by changing the index. ALso adds custom transition.
for (i = 0; headerBackgroundImageChildrenList.length > i; i++) {
    child = headerBackgroundImageChildrenList[i];
    child.object.style.transform = `translate(${(child.index * 100)}%)`;
    child.object.style.transition = `all 1200ms cubic-bezier(0.19, 0.77, 0, 0.99)`;

    // Setting the day section transform
    if (child.index !== 0) continue;
    const activeDaySectionHeight = document.querySelector(`section.day-${headerBackgroundImageChildrenList.indexOf(child) + 1}`).offsetHeight;
    main.style.height = `${activeDaySectionHeight}px`;
}

const animateButton = (whichButton) => {

    switch (whichButton) {
        case "next":
            nextButton.object.style.transform = `rotate(${nextButton.rotation + 90}deg)`;
            previousButton.object.style.transform = `rotate(${previousButton.rotation + 90}deg)`;

            nextButton.rotation = nextButton.rotation + 90;
            previousButton.rotation = previousButton.rotation + 90;
            break;
        case "previous":
            nextButton.object.style.transform = `rotate(${nextButton.rotation + -90}deg)`;
            previousButton.object.style.transform = `rotate(${previousButton.rotation + -90}deg)`;

            nextButton.rotation = nextButton.rotation + -90;
            previousButton.rotation = previousButton.rotation + -90;
            break;
    }

};

const nextImage = () => {

    // If the last element is visible, disable the scrolling
    if (headerBackgroundImageChildrenList[headerBackgroundImageChildrenList.length - 1].index === 0) return;

    animateButton("next");

    for (i = 0; headerBackgroundImageChildrenList.length > i; i++) {
        child = headerBackgroundImageChildrenList[i];

        child.index--;

        child.object.style.transform = `translate(${(child.index * 100)}%)`;

        // Setting the days transform
        if (child.index !== 0) continue;
        days.style.transform = `translate(0%, ${-(headerBackgroundImageChildrenList.indexOf(child) * 48)}px`;

        // Setting the main content to transform
        main.style.transform = `translate(${-(headerBackgroundImageChildrenList.indexOf(child) * 100)}vw)`;

        const activeDaySectionHeight = document.querySelector(`section.day-${headerBackgroundImageChildrenList.indexOf(child) + 1}`).offsetHeight;
        main.style.height = `${activeDaySectionHeight}px`;
    }

};


const previousImage = () => {

    // If the first element is visible, disable the scrolling
    if (headerBackgroundImageChildrenList[0].index === 0) return;

    animateButton("previous");

    for (i = 0; headerBackgroundImageChildrenList.length > i; i++) {
        child = headerBackgroundImageChildrenList[i];

        child.index++;

        child.object.style.transform = `translate(${(child.index * 100)}%)`;

        // Setting the days transform
        if (child.index !== 0) continue;
        days.style.transform = `translate(0%, ${-(headerBackgroundImageChildrenList.indexOf(child) * 48)}px`;

        // Setting the main content to transform
        main.style.transform = `translate(${-(headerBackgroundImageChildrenList.indexOf(child) * 100)}vw)`;

        const activeDaySectionHeight = document.querySelector(`section.day-${headerBackgroundImageChildrenList.indexOf(child) + 1}`).offsetHeight;
        main.style.height = `${activeDaySectionHeight}px`;
    }

};



// Arrow swiping
const body = document.querySelector("body");
body.addEventListener("keyup", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

    switch (e.key) {
        case "ArrowRight":
            nextImage();
            break;
        case "ArrowLeft":
            previousImage();
            break;
    }

});
