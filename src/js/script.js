// INICIALIZAR ELEMENTOS
const textNewTask = document.getElementById("new-task");
const listaTareas = document.getElementById("task-list");

// Variable global para la instancia de Masonry
let msnry;

document.addEventListener("DOMContentLoaded", function () {
    msnry = new Masonry(listaTareas, {
        itemSelector: ".card",
        columnWidth: 300,   
        gutter: 24,         
        percentPosition: true
    });

    mostrarTareas();
});

document.getElementById("new-task").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (textNewTask.value.trim() !== "") {
            añadirTarea(textNewTask.value);
            guardarTareas();
        }
    }
});

function añadirTarea(tarea) {
    if (tarea.trim() === "") {
        tarea = textNewTask.value;
    }
    textNewTask.value = ""; 

  
    let cardTarea = document.createElement("div");
    let infoTarea = document.createElement("p");

   
    infoTarea.classList.add(
        "font-semibold",
        "text-lg",
        "px-2",
        "py-1",
        "m-2",
        "whitespace-normal",
        "break-words",
        "max-w-full"
    );

    const Color = () => {
        const colores = ["yellow-200", "green-200", "blue-300", "purple-200", "pink-200"];
        console.log(colores)
        return colores[Math.floor(Math.random() * colores.length)];
    }

    cardTarea.classList.add("bg-"+Color());
    cardTarea.classList.add("border-"+Color());
  
    cardTarea.classList.add(
        "card",
        "block",               
        "w-[300px]",           
        "h-auto",
        "border",
        "rounded-lg",          
        "relative",           
        "shadow-lg",           
        "p-4",                 
        "break-inside-avoid", 
        "mb-2",               
        "transform",          
        "hover:scale-105",    
        "transition-all",     
        "cursor-pointer",     
        "rotate-3",          
        "origin-top-left",     
        "shadow-xl",          
        "text-black",         
    );


    cardTarea.setAttribute("data-attribute", "tarea");
    cardTarea.appendChild(infoTarea);
    infoTarea.innerText = tarea;

    listaTareas.appendChild(cardTarea);

   
    if (msnry) {
        msnry.appended(cardTarea);
    
        setTimeout(function () {
            msnry.layout();
        }, 100);
    }

   
    let botonBorrar = document.createElement("button");
    botonBorrar.classList.add(
        "botonDelete",
        "bg-pink-800",
        "hover:bg-red-600",
        "text-white",
        "px-2",
        "py-1",
        "rounded-md",
        "transition",
        "absolute",
        "bottom-0",
        "right-0",
        "m-2",
        "mt-5"
    );
    botonBorrar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>';
    cardTarea.appendChild(botonBorrar);

    botonBorrar.addEventListener("click", function () {
        if (msnry) {
            msnry.remove(cardTarea);
            msnry.layout();
        }
        cardTarea.remove();
        guardarTareas();
    });
}

function guardarTareas() {
    let tareas = [];
    listaTareas.querySelectorAll("[data-attribute='tarea']").forEach(tarea => {
        let textoTarea = tarea.querySelector("p")?.innerText.trim(); // Excluye el botón
        if (textoTarea) {
            tareas.push(textoTarea);
        }
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    let tareas = JSON.parse(localStorage.getItem("tareas"));

    if (tareas) {
      
        tareas.forEach(tarea => {
            añadirTarea(tarea);
        });

       
        if (msnry) {
           
            setTimeout(function () {
                msnry.reloadItems();   
                msnry.layout();      
            }, 100);
        }
    }
}

function borrarTareas() {
    localStorage.removeItem("tareas");
    listaTareas.innerHTML = "";
    if (msnry) {
        msnry.reloadItems();
        msnry.layout();
    }
}
