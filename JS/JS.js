let data = [];

//tab
const tab = document.querySelector(".tab")
tab.addEventListener("click", e=>{
   if(e.target.tagName === "LI"){
      const allLi = tab.querySelectorAll("li");
      allLi.forEach((item) =>item.classList.remove("active"));
      e.target.classList.add("active");
      renew();
   }
})

//分類
function renderUnchecked(item){
   let filterData =[];
   filterData = data.filter(item => !item.checked);
   renderItems(filterData);
}

function renderChecked(item){
   let filterData =[];
   filterData = data.filter(item => item.checked);
   renderItems(filterData);
}

function renew(){
   const active =document.querySelector(".tab .active")
   const activeLocation = active.textContent.trim();
   if(activeLocation ==="全部"){
      renderItems(data);
   }
   else if(activeLocation ==="待完成"){
      renderUnchecked();
   }
   else if(activeLocation ==="已完成"){
      renderChecked();
   }
}


//渲染項目
const list = document.querySelector(".list");
function renderItems(render){
   let str=""
   render.forEach(function(item, index){
      let checkedclass = item.checked ? "checked" : "";
      let content = `<li>
                     <label class="checkbox" for="">
                     <button class="check-btn ${checkedclass}" data-id="${item.id}"></button>
                     <span class="${checkedclass}">${item.content}</span>
                     </label>
                     <a data-id="${item.id}" href="#" class="delete"></a>
                     </li>`
      str+=content
   })
   list.innerHTML=str;
   num();
}

//新增項目
const text = document.querySelector("#text");
const add = document.querySelector(".btn_add");
add.addEventListener("click", e =>{
   if(text.value===""){
      alert("請輸入代辦事項")
      return
   }
   else{
      let obj = { id: Date.now(), content: text.value, checked: false };
      data.push(obj);
      text.value ="";
      
      const allLi = tab.querySelectorAll("li");
      allLi.forEach((item) =>item.classList.remove("active"));
      const all = Array.from(allLi).find(li => li.textContent.trim() === "全部");
      all.classList.add("active")

      renew();
   }
})

//確認 刪除

list.addEventListener("click", e =>{
  const id = Number(e.target.getAttribute("data-id"));
  if(e.target.classList.contains("check-btn")){
    const target = data.find(item => item.id === id);
    if(target) target.checked = !target.checked;
    renew();
  }
  if(e.target.classList.contains("delete")){
    data = data.filter(item => item.id !== id);
    renew();
  }
})

//計數
function num(){
   let n = data.filter(item => !item.checked).length;
   const p = document.querySelector("p");
   p.textContent=`${n} 個待完成項目`;

}

//一鍵刪除
const allDel = document.querySelector(".allDel")
allDel.addEventListener("click", e=>{
   data = data.filter(item=> !item.checked);
   renew();
})
