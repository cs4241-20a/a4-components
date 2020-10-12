// a helper function that creates a list item for a given dream
appendNewDream(dream) {

    var row = dl.insertRow(1);
    var fn = row.insertCell(0);
    var ln = row.insertCell(1);
    var grade = row.insertCell(2);
    var accidents = row.insertCell(3);
    var dog = row.insertCell(4);

    var res = dream.split(" ");

    if(res.length <= 0) {
        fn.innerHTML = "No Name Given";
        ln.innerHTML = "No Last Name Given";
        grade = "No Data Given";
        accidents = "No Data Given";
        dog = "No Data Given";
    }
    else if(res.length == 1){
        fn.innerHTML = res[0];
        ln.innerHTML = "No Last Name Given";
        grade.innerHTML = "No Data Given";
        accidents.innerHTML = "No Data Given";
        dog.innerHTML = "No Data Given";
    }
    else if(res.length == 2){
        fn.innerHTML = res[0];
        ln.innerHTML = res[1];
        grade.innerHTML = "No Data Given";
        accidents.innerHTML = "No Data Given";
        dog.innerHTML = "No Data Given";
    }
    else if(res.length == 3){
        fn.innerHTML = res[0];
        ln.innerHTML = res[1];
        grade.innerHTML = res[2];
        accidents.innerHTML = "No Data Given";
        dog.innerHTML = "No Data Given";
    }
    else if(res.length == 4){
        fn.innerHTML = res[0];
        ln.innerHTML = res[1];
        grade.innerHTML = res[2];
        accidents.innerHTML = res[3];
        dog.innerHTML = "No Data Given";
    }
    else{
        fn.innerHTML = res[0];
        ln.innerHTML = res[1];
        grade.innerHTML = res[2];
        accidents.innerHTML = res[3];
        dog.innerHTML = res[4];
    }
}