const typeButtons = document.querySelectorAll(".type-btn");
const countButtons = document.querySelectorAll(".count-btn");

let selectedType = "";
let selectedCount = 5;


// Select Question Type

typeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        typeButtons.forEach(b =>
            b.classList.remove("selected")
        );

        btn.classList.add("selected");

        selectedType = btn.innerText
        .toLowerCase()
        .replace(" ","_")
        .replace("-","_");

    });

});




// Select Number of Questions

countButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        countButtons.forEach(b =>
            b.classList.remove("selected")
        );

        btn.classList.add("selected");

        selectedCount = btn.innerText;

    });

});




// Load JSON Files

async function loadSubjects(){

    const files=[

        "physics.json",

        "chemistry.json",

        "biology.json",

        "mathematics.json",

        "history.json",

        "geography.json",

        "economics.json",

        "business_studies.json",

        "accountancy.json",

        "political_science.json"

    ];


    let database={};


    for(let file of files){

        try{

            const response=

            await fetch(file);

            const data=

            await response.json();

            database={

                ...database,

                ...data

            };

        }

        catch(error){

            console.log(

                file,

                "not found"

            );

        }

    }


    return database;

}





// Generate Questions


document

.getElementById(

"generateBtn"

)

.addEventListener(

"click",

async()=>{


const prompt=

document

.getElementById(

"prompt"

)

.value

.toLowerCase()

.trim();



if(prompt===""){

alert(

"Please enter topic"

);

return;

}



if(selectedType===""){

alert(

"Select question type"

);

return;

}


const database=

await loadSubjects();


let topicFound=null;


for(

let topic

in database

){

if(

prompt.includes(

topic

.replaceAll(

"_",

" "

)

)

){

topicFound=topic;

break;

}

}


const output=

document

.getElementById(

"output"

);


output.innerHTML="";



if(

topicFound===null

){

output.innerHTML=

`

<div class="question-card">

<h3>

Topic not found

</h3>

<p>

Questions for this topic

will be added soon.

</p>

</div>

`;

return;

}



let questions=

database

[topicFound]

[selectedType];



if(

!questions ||

questions.length===0

){

output.innerHTML=

`

<div class="question-card">

<h3>

No Questions

</h3>

<p>

This category

is empty.

</p>

</div>

`;

return;

}



let count=

parseInt(

selectedCount

);


if(

isNaN(count)

){

count=5;

}



questions=

questions

.slice(

0,

count

);



questions

.forEach(

(q,index)=>{


output.innerHTML+=

`

<div class="question-card">


<h3>

Question

${index+1}

</h3>


<p>

${q.question}

</p>



<button

class="show-answer"

onclick=

"toggleAnswer(${index})"

id=

"btn${index}"

>

Show Answer

</button>



<div

class="answer"

id=

"answer${index}"

>

${q.answer}

</div>


</div>

`;

});



});






function

toggleAnswer(

id

){

const ans=

document

.getElementById(

`answer${id}`

);


const btn=

document

.getElementById(

`btn${id}`

);



if(

ans.style.display

==="block"

){

ans.style.display=

"none";

btn.innerText=

"Show Answer";

}

else{

ans.style.display=

"block";

btn.innerText=

"Hide Answer";

}

        }
