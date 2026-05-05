  API="http://127.0.0.1:5000/studentsinfo"
  let showstudents1=document.getElementById("showstudents")

  async function loadStudents(){
    const res=await fetch(API)
    const data=await res.json()
    console.log(data)

    let output =`<table border=1 class="tbl">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>  
                `;
    data.forEach(s=>{
      output+=`<tr>
                  <td>${s.name}</td>
                  <td>${s.email}</td>
                  <td>
                    <button onclick="deleteStudent('${s._id}')"> Delete</button>
                    <button onclick="showEdit('${s._id}','${s.name}','${s.email}')"> Edit</button>
                  </td>
                </tr>  
        
        `;
    })
    output+="</table>"
    showstudents1.innerHTML=output;
  }

  async function addStudent() {
    console.log("dddd")
    let name=document.getElementById("sname").value;    
    let email=document.getElementById("semail").value;
   
    const response=await fetch(API,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,email})
    });
    const data=await response.json()
    document.getElementById("msg").innerHTML=data.message

    
    loadStudents()

 }
  async function deleteStudent(id){
    await fetch(`${API}/${id}`,{
      method:"DELETE"
    })
    
      loadStudents()
  }

  function showEdit(id,name,email){
    let editstudent1=document.getElementById("editstudent")
    editstudent1.style.display="flex"
    let editoutput=`<div class="editbox">
                      <h2>Edit Student</h2>
                      <form>
                      <input type="hidden" value="${id}" id="upid">
                      <input type="text" value="${name}" id="upname">
                      <input type="text" value="${email}" id="upemail">
                      <input type="submit" value="update" onclick="editStudent()">
                       <input type="submit" value="cancel" onclick="hideEdit()" >
                      </form>
                     
                    `
    editstudent1.innerHTML=editoutput

  }

  function hideEdit(){
    let editstudent1=document.getElementById("editstudent")
    editstudent1.innerHTML=""
    editstudent1.style.display="none"
  }
  async function editStudent(){
    let id=document.getElementById("upid").value
    let name=document.getElementById("upname").value
    let email=document.getElementById("upemail").value
   
    response=await fetch(API,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id,name,email})
    })
    const data=await response.json()
      document.getElementById("msg").innerHTML=data.message
      hideEdit()
  }

  
  loadStudents();