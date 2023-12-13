let title=document.getElementById('title');
let price=document.getElementById('price');
let taxs=document.getElementById('taxs');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='Create';
let tmp;
let moodsearch='title';
let search=document.getElementById('search');



/*---------------------------------------------------------------*/
function getTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxs.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='green';
    }
    else{
        total.style.background='rgb(150, 20, 20)';

    }
}


/*---------------------------------------------------------------*/
let dataproduct;
if(localStorage.product!=null){
    dataproduct=JSON.parse(localStorage.product)
}
else{dataproduct=[]}
submit.onclick=function(){
    let newproduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxs:taxs.value,
        ads:ads.value,
        discount:discount.value,  
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value!=''&&price.value!=''&&category.value!=''&&count.value<=100){
        if(mood==='Create'){
            if(newproduct.count>1){
                for(let i=0;i<newproduct.count;i++){
                    dataproduct.push(newproduct)
                }
            }
            else{
                dataproduct.push(newproduct)
            }
            cleardata();
    
        }
        else{
            dataproduct[tmp]=newproduct;
            mood='Create'
            count.style.display='block';
            submit.innerHTML='Create';
            getTotal();
        }
    }
    
    
    localStorage.setItem('product',JSON.stringify(dataproduct));
      
      datashow();
      
}
/*----------------------------------------------------------------*/

function cleardata(){
    title.value='';
    price.value='';
    taxs.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
/*----------------------------------------------------------------*/
function datashow(){
    getTotal();
    let table='';
    for(let i=0 ;i < dataproduct.length ; i++){
        console.log([i]);
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxs}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discount}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">Update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML=table;

    let bntdelete= document.getElementById('deleteall');
    if(dataproduct.length>0){
       bntdelete.innerHTML=`<button onclick="deleteALL()">Delete All(${dataproduct.length})</button>`
    }
    else{
        bntdelete.innerHTML='';
    }
}
datashow();
/*----------------------------------------------------------------*/
function deletedata(index){
    dataproduct.splice(index,1);
    localStorage.product=JSON.stringify(dataproduct);
    datashow();
}
/*----------------------------------------------------------------*/
function deleteALL(){
    localStorage.clear();
    dataproduct.splice(0);
    datashow();
}
/*----------------------------------------------------------------*/
function updatedata(index){
    title.value=dataproduct[index].title;
    price.value=dataproduct[index].price;
    taxs.value=dataproduct[index].taxs;
    ads.value=dataproduct[index].ads;
    discount.value=dataproduct[index].discount;
    category.value=dataproduct[index].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='Update';
    mood='Update'
    tmp=index;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

/*----------------------------------------------------------------*/
function searchmood(id){
    debugger;
    if(id=='st'){
        moodsearch='title'
        search.placeholder='Search By Title';
    }
    else{
        moodsearch='category'
        search.placeholder='Search By Category';
    }
    search.focus();
    search.value='';
    datashow();
}
function searchdata(value){
    debugger;
    let table='';
    for(let i=0;i<dataproduct.length;i++){
        if(moodsearch=='title'){
             if(dataproduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${[i+1]}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxs}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].total}</td>
                <td>${dataproduct[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>`
              }
            }
            else {
                if(dataproduct[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${[i+1]}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxs}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                </tr>`
                  }
                }
        }
        document.getElementById('tbody').innerHTML=table;
}       
