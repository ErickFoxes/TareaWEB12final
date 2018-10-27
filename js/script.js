window.onload = init;

function init() {
    let todoList = {
        listHTML: document.getElementById("todoList"),
        listTask: [],
        add(task, priority = false) {
            let element = document.createElement("li");
            element.innerText = task;
            let eliminarBtn = document.createElement("input");
            let realizadoBtn = document.createElement("input");
            eliminarBtn.type = "button";
            eliminarBtn.value = "Eliminar";
            realizadoBtn.type = "button";
            realizadoBtn.value = "Realizado";
            element.appendChild(eliminarBtn);
            element.appendChild(realizadoBtn);                 

            // Elimine de la lista
            eliminarBtn.addEventListener("click", function () {
                let parent = element.parentNode;
                if(parent){
                    parent.removeChild(element);
                }
            });

            realizadoBtn.addEventListener("click", function () {
                let hecho = document.createElement("p");
                hecho.innerText = " *Realizado* ";
                hecho.style.color = "red";
                element.appendChild(hecho);
            });

            if (priority) {
                this.listTask.unshift({
                    element,
                    task
                });
                this.listHTML.insertBefore(element, this.listHTML.childNodes[0]);
            } else {
                this.listTask.push({
                    element,
                    task
                });
                this.listHTML.appendChild(element);
            }
        }
    }

    let form = document.managerTask;
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let task = form.task.value;

        let validTask = /.{2,}/;
        if (!validTask.test(task)) {
            console.log("Ingrese una descripcion clara");
            return false;
        }

        todoList.add(task, form.important.checked);

    });
}