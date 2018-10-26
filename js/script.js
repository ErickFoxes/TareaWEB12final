// Object Literal
var person = {
    /* property: value*/
    name: "Néstor",
    lastname: "Aldana",
    birthday: Date.now()
}; // JSON (JavaScript Object Notation)

// Access to propertys
console.log(person.name);
// Change object's property value
person.birthday = new Date(1994, 0, 11); // 11 - Jan - 1994
console.log(person.birthday);

console.log(person.dui) // undefined
person.dui = "000000000" // Assign 
console.log(person.dui) // 000000000

// Example
function createPerson(name, lastname, birthday, dui) {
    return {
        name,
        lastname,
        birthday,
        dui
    }
}

let list = [] // To save persons

// To Add 10 fake persons
for (let i = 0; i < 10; i++) {
    list.push(createPerson(`Name ${i}`, `Lastname ${i}`, cumpleanosFormato(i) , `000000${i}`));
}

console.table(list);

// Array Higher function
// Show only the name persons
console.table(list.map(({
    name
}) => name));

// Get average age
/*
console.log("Average age %i", list.reduce((sum, {
    birthday
}) => {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970) + sum;
}, 0) / list.length);
*/

// More readable

function getAge(birthday) {
    var fecha_actual = new Date(Date.now());
    var ageDifMs = fecha_actual - birthday + contarAnoBiciesto();

    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var ano = Math.abs(ageDate.getUTCFullYear() - 1970);

    var mes_cumpleanos = Math.abs(ageDate.getUTCMonth());
    var mes_actual = fecha_actual.getUTCMonth();

    var dia_cumpleanos = Math.abs(ageDate.getUTCDay());
    var dia_actual = fecha_actual.getUTCDay();
    
    if(mes_actual==mes_cumpleanos){
        if(dia_actual>dia_cumpleanos){
            ano=ano-1;
        }
    }else if(mes_actual>mes_cumpleanos){
        ano=ano-1;
    }
    return ano;
}

function contarAnoBiciesto() {
    let anio_inicial =1;
    let anio_actual = 1970;
    //let anio_actual = (new Date(Date.now())).getUTCFullYear();
    for (var cont = 0; anio_inicial <= anio_actual; anio_inicial++) {
        if((anio_inicial%4)===0 && (anio_inicial%100)!=0 || (anio_inicial%400)==0){
            cont=cont+1;
        }
    }
    //console.log(cont);
    return (cont)*24*60*60*1000;
}

function cumpleanosFormato(ite) {
    let cumpleanos = new Date().setFullYear(1990 + ite + Math.floor(Math.random() * 5));

    return cumpleanos;
}

console.log("Average age %i", list.reduce((sum, {
    birthday
}) => getAge(birthday) + sum, 0) / list.length);