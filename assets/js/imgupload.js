const upload = document.querySelectorAll('.tools__image');

upload[4].addEventListener('click' , (e) => {
    // Open File Explorer
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.addEventListener('change' , (e) => {
       let file =  input.files[0];
       let url = URL.createObjectURL(file);

       let stickyTemplateHTML = `
       <div class="header__container">
             <div class="minimize">-</div> 
             <div class="remove">✠</div>
       </div>
       <div class="note__container">
            <img src = "${url}"/>
       </div>
       `;
        
       createSticky(stickyTemplateHTML)
    })
})

function createSticky(stickyTemplateHTML){

        let stickyContainer = document.createElement('div');
        stickyContainer.setAttribute("class", "sticky__container");
        stickyContainer.innerHTML = stickyTemplateHTML;
    
        document.body.appendChild(stickyContainer);
    
        
        // STICKY NOTE MINIMIZE AND DELETE FUNCTIONALITY ----------------------
    
        let note__minimize  = stickyContainer.querySelector(".minimize");
        let note__remove  = stickyContainer.querySelector(".remove");
    
        stickyNoteActions(note__minimize, note__remove,stickyContainer);
    
    
}