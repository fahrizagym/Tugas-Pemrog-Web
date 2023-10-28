import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student-dashboard.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {

  formValue !: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService){

  }

  ngOnInit(): void{
    this.formValue = this.formbuilder.group({
      nama : [''],
      nim : [''],
      jurusan : [''],
      tahunMasuk : [''],
    })
    this.getAllStudent();
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postStudentDetails(){
    this.studentModelObj.nama = this.formValue.value.nama;
    this.studentModelObj.nim = this.formValue.value.nim;
    this.studentModelObj.jurusan = this.formValue.value.jurusan;
    this.studentModelObj.tahunMasuk = this.formValue.value.tahunMasuk;

    this.api.postStudent(this.studentModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Berhasil Menambahkan Data Mahasiswa!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    },
    err=>{
      alert("Ada yang salah")
    })
  }

  getAllStudent(){
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData = res;
    })
  }

  deleteStudentData(row : any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Data Berhasil Dihapus!");
      this.getAllStudent();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id;
    this.formValue.controls['nama'].setValue(row.nama);
    this.formValue.controls['nim'].setValue(row.nim);
    this.formValue.controls['jurusan'].setValue(row.jurusan);
    this.formValue.controls['tahunMasuk'].setValue(row.tahunMasuk);
  }

  updateStudentDetails(){
    this.studentModelObj.nama = this.formValue.value.nama;
    this.studentModelObj.nim = this.formValue.value.nim;
    this.studentModelObj.jurusan = this.formValue.value.jurusan;
    this.studentModelObj.tahunMasuk = this.formValue.value.tahunMasuk;

    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
    .subscribe(res=>{
      alert("Berhasil Diperbrui")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    })
  }

}
