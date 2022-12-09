// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

function show_customlist(){
    $.ajax({
        type: 'GET',
        url:`${backend_base_url}articles/`,
        data: {},
        success: function(response) {
            let books = response
            for (let i=0; i < 10; i++){
                append_temp_html(
                    books[i].id,
                    books[i].img_url,
                    books[i].book_title,
                    books[i].book_content
                )
            }
            function append_temp_html(id, img_url, book_title, book_content){
                temp_html = `
                <div class="book-cell">
                    <div class="book-img">
                    <img src="${img_url}" class="book-photo">
                </div>
                <div class="book-content">
                    <div class="book-title">${book_title}</div>
                    <div class="book-sum">${book_content}</div>
                    <section title=".squaredFour">
                        <div class="squaredFour" id=${id} onclick=save_id(this.id)>
                            <input type="checkbox" value="None" id="squaredFour" name="check" checked />
                            <label for="squaredFour"></label>
                        </div>
                    </section>
                </div>
                `
                $('#customlist').append(temp_html)
                
            
            }
          }
        }
        

    )}show_customlist()
let id_list = []
function save_id(id){
    id_list.push(id)
    console.log(id_list)
}

async function send_id(){
    const response = await fetch(`${backend_base_url}articles/book/`, {
            method: 'POST',
            header: {
                Accept: "application/json",
                'Content-type':'application/json'
            },
            body: JSON.stringify({"id_list":id_list}),
        })
        .then(res=> res.json())
        .then(data=> console.log(data));

        response_json = await response.json()
    }
