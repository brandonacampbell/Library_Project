console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

const books = [
    {
        id: 1,
        title: "Name of the Wind",
        author: "Patrick Rothfuss", 
        read: true,
    },
];

class Book {
    constructor(id, title, author, read){
        this.id = id; 
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

class Library {
    constructor(books){
        this.nextId= books.length;
        this.books = books;
    } 

    addBook(){
        // select the input from the form-- title, author, and read
        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const read = document.getElementById("read");
        //Increment book count property
        this.nextId++;
        // the (.value) property returns the default value OR the value a user types in. 
        const newBook = new Book(this.nextId, title.value, author.value, read.checked);
        //push the new book instance to the books array
        this.books.push(newBook);
        //Select table body (we will need this to append the rows to)
        //___In the HTML, inside <body> i made an id for tableBody 
        //<body id="tableBody">
        const tbody = document.getElementById("tableBody");
        // create new table row 
        const newTr = document.createElement("tr");
        newTr.classList.add(newBook.id);
        newTr.addEventListener("dblclick", () => {
            this.removeBook(newBook.id);
        });
        //create three new table data cells 
        const newTitle = document.createElement("td");
        const newAuthor = document.createElement("td");
        const newRead = document.createElement("td");
        // Add text content to table data cells with book values
        newTitle.textContent = title.value;
        newAuthor.textContent = author.value;
        const newCheckbox = document.createElement("input");
        newCheckbox.classList.add(newBook.id);        
        newCheckbox.type = "checkbox";
        newCheckbox.checked = read.checked;
        newCheckbox.disabled = read.checked;
        newCheckbox.addEventListener("click", (event) => {
            this.markRead(event.target, newBook.id);
        });
        newRead.appendChild(newCheckbox);
        //append the table data cells to the table rows
        newTr.appendChild(newTitle);
        newTr.appendChild(newAuthor);
        newTr.appendChild(newRead);
        //append the table row to the table body
        tbody.appendChild(newTr);
    };



    markRead(checkbox, id){
    this.books.forEach(book => {
        if (id == book.id){
            book.read = true;
            checkbox.disabled = true; 
        }
    }); 
 }

 removeBook(bookId){
    this.book = this.books.filter(({ id }) => bookId !== id);
    const tbody = document.getElementById("tableBody");
    tbody.removeChild(document.getElementsByClassName(bookId)[0]);
 }
}
const library = new Library(books);

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    library.addBook();
});