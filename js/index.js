var bookNameInput = document.getElementById('name');
var urlInput = document.getElementById('URL');
var addBtn = document.getElementById('Submit');
var bookContanier = [];
if (localStorage.getItem('bookmark') != null) {
    bookContanier = JSON.parse(localStorage.getItem('bookmark'));
    display(bookContanier);
}
function addBookmark() {
    var bookmark = {
        name: bookNameInput.value,
        url: urlInput.value
    }
    if (validate(bookNameInput) && validate(urlInput) && (isDuplicateName(bookmark.name) == false)) {
        bookContanier.push(bookmark);
        localStorage.setItem('bookmark', JSON.stringify(bookContanier));
        clearForm();
        display();
        console.log(bookContanier);
    } else {
        error();
    }
}
function display() {
    var container = ``;
    for (var i = 0; i < bookContanier.length; i++) {
        container += ` <tr class="fw-normal">
                                        <td><span>${i + 1}</span></td>
                                        <td>
                                            <span>${bookContanier[i].name}</span>
                                        </td>
                                        <td>
                                        <button onclick="visit(${i})"  class="btn  btn-visit"><i class="fa-regular fa-eye"></i> Visit</button>
                                        </td>
                                        <td>
                                            <button onclick="deleted(${i})" class="btn btn-delete"><i class='bx bx-trash'></i> Delete</button>
                                        </td>
                                    </tr> `
    }
    document.getElementById('books').innerHTML = container;


}
function clearForm() {
    bookNameInput.value = null;
    urlInput.value = null;
}
function deleted(deleteIndex) {
    bookContanier.splice(deleteIndex, 1);
    display();
    localStorage.setItem('bookmark', JSON.stringify(bookContanier));

}
function visit(v) {
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookContanier[v].url)) {
        open(bookContanier[v].url, '_blank');
    }
}
function validate(element) {
    var regex = {
        name: /^[A-z][a-z]{2,8}$/,
        URL: /^https?:\/\//
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    }
}
function isDuplicateName(name) {
    for (var i = 0; i < bookContanier.length; i++) {
        if (bookContanier[i].name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}
function error() {
    swal.fire({
        // html: "<span> Site Name or Url is not valid, Please follow the <br> rules below </span>",
        html:`<div class="icon text-start mb-4">
        <i class='bx bxs-circle me-1 text-danger'></i><i class='bx bxs-circle me-1 text-warning'></i><i class='bx bxs-circle me-1 text-success'></i>
        </div>
        <div class="rules">
        <h2 class="fw-bold text-start mb-3"> Site Name or Url is not valid, Please follow the rules below </h2>
        <h4 class="mb-3"><i class='bx bx-right-arrow-circle'></i> Site name must contain at least 3 characters </h4>
        <h4><i class='bx bx-right-arrow-circle'></i> Site URL must be a valid one </h4>
        </div>
        
        `,
        className: "sweetAlert",
        showConfirmButton: false,
        showCloseButton: true,
        confirmButtonText: "ok",

    })

}