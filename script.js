const typeButtons = document.querySelectorAll(".type-btn");
const countButtons = document.querySelectorAll(".count-btn");

let selectedType = "";
let selectedCount = 5;


// Question Type Select

typeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        typeButtons.forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");

        selectedType = btn.innerText;

    });

});


// Question Count Select

countButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        countButtons.forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");

        selectedCount = btn.innerText;

    });

});


// Generate Questions

document

.getElementById("generateBtn")

.addEventListener("click", () => {

    const prompt =

    document

    .getElementById("prompt")

    .value

    .trim();



    if (prompt === "") {

        alert("Please enter a topic.");

        return;

    }


    if (selectedType === "") {

        alert("Please select question type.");

        return;

    }


    const output =

    document

    .getElementById("output");


    output.innerHTML = "";


    let count = parseInt(selectedCount);


    if (isNaN(count)) {

        count = 5;

    }


    for (

        let i = 1;

        i <= count;

        i++

    ) {

        output.innerHTML += `

        <div class="question-card">

            <h3>

            Question ${i}

            </h3>


            <p>

            ${prompt}

            -

            Sample ${selectedType}

            Question ${i}

            </p>


            <button

            class="show-answer"

            onclick="toggleAnswer(${i})"

            id="btn${i}"

            >

            Show Answer

            </button>


            <div

            class="answer"

            id="answer${i}"

            >

            This is the answer for

            Question ${i}.

            Later,

            questions.json

            will provide

            real answers.

            </div>

        </div>

        `;

    }

});




// Show / Hide Answer

function toggleAnswer(id) {

    const ans =

    document

    .getElementById(

        `answer${id}`

    );


    const btn =

    document

    .getElementById(

        `btn${id}`

    );


    if (

        ans.style.display === "block"

    ) {

        ans.style.display = "none";

        btn.innerText =

        "Show Answer";

    }

    else {

        ans.style.display = "block";

        btn.innerText =

        "Hide Answer";

    }

}
