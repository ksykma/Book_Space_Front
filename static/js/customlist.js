 function changeValue(){
    var A=document.getElementById("changeTest").value;

    function show_customlist(){
        $('#customlist').empty()
        $('#booklist-main').empty()
        $.ajax({
            type: 'GET',
            url:`${backend_base_url}articles/recommend/?genre_list=${A}`,
            data: {},
            success: function(response) {
                let books = response
                for (let i=0; i < books.length; i++){
                    append_temp_html(
                        books[i].id,
                        books[i].img_url,
                        books[i].book_title,
                        books[i].book_content,
                        books[i].book_link,
                    )
                }


                function append_temp_html(id, img_url, book_title, book_content, book_link){
                    temp_html = `
                    <div class="book-cell" >
                        <div class="book-img" onclick="window.open('${book_link}')">
                        <img src="${img_url}" class="book-photo">
                        </div>
                        <div class="book-content">
                            <div class="book-title">${book_title}</div>
                            <div class="book-sum">${book_content}</div>
                        </div>
                        <div class="checkbox">
                            <input class="check" type="checkbox" id="${id}"  name="check" onclick=save_id(this.id)>
                        </div>
                    </div>
                    `
                    $('#customlist').append(temp_html)
                }
            }

        }
        )
    }
    show_customlist()
}
changeValue();



var select_books = [];
function save_id(id){
    if($(`input:checkbox[id=${id}]`).is(":checked") == true){
        select_books.push(id)
    }
    else if($(`input:checkbox[id=${id}]`).is(":checked") == false){
        for(let i=1; i< select_books.length; i++){
            if(select_books[i] == id){
                select_books.splice(i, 1);
                i--;
            }
        }
    }
}


async function send_id(){
    const response = await fetch(`${backend_base_url}users/user-choice/`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify({"choice":select_books})

        })
        response_json = await response.json()
        if(response.status == 200){
            Swal.fire({
                title: '메인페이지로 이동합니다!',
                text: '취향이 반영된 책을 추천드리겠습니다.',
                icon: 'success',
                confirmButtonColor: '#FFCCCC',
                confirmButtonText: '확인',
            }).then(result =>{
                if(result.isConfirmed){
                    window.location.href = "../templates/main.html"
                }
            })
        }else{
            Swal.fire({
                title: '최소1개, 3개 이하로 선택해주세요!',
                icon: 'warning',
                confirmButtonColor: '#FFCCCC',
                confirmButtonText: '확인',
            }).then(result =>{
                if(result.isConfirmed){
                    window.location.reload()
                }
            })
        }
    }

