import { useEffect, useRef, useState } from 'react';
import { TableRow, Input, FormButton, ModalSuccess, ModalError } from './components';
import { checkValueInput, convertDate, deleteData, editData, getData, newData } from './function';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from "react-loader-spinner";
import './assets/css/main.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState(0);
  const MySwal = withReactContent(Swal)
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [dataInput, setDataInput] = useState({
    id: 'new',
    uang: '',
    jenis: '',
    keterangan: '',
    tanggal : Date.now(),
  })
  const refInputId = useRef();
  const refInputUang = useRef();
  const refRadioDebit = useRef();
  const refRadioKredit = useRef();
  const refInputKeterangan = useRef();
  const refInputTanggal = useRef();

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  const handleRadioChange = (e) => {
    if (e.target.value.toLowerCase() === 'debit') {
      setDataInput({
        ...dataInput, jenis: 'D'
      })
    }
    else if (e.target.value.toLowerCase() === 'kredit') {
      setDataInput({
        ...dataInput, jenis: 'K'
      })
    }
  }

  const resetInput = () => {
    setDataInput({
      ...dataInput,
      id: 'new',
      uang: 0,
      keterangan: '',
      jenis: '',
      tanggal: new Date()
    })
  }

  const normalTable = (id) => {
    const allTable = document.getElementsByName('tableRow');
    const normalDiv = 'bg-white hover:bg-gray-200 cursor-pointer';
    allTable.forEach((row) => {
      if (id !== row.id) {
        row.classList = normalDiv;
      }
    })
  }

  const editOrDelete = (item) => {
    const clickedDiv = 'bg-gray-200 hover:bg-gray-200 cursor-pointer';
    // console.log(item)
    setDataInput({
      ...dataInput,
      id: item.id,
      uang: item.uang,
      keterangan: item.keterangan,
      jenis: item.jenis.toLowerCase() === 'd' ? 'D' : 'K',
      tanggal: convertDate(item.tanggal, true)
    })
    document.getElementById(item.id).classList = clickedDiv;
    normalTable(item.id);
    if (item.jenis.toLowerCase() === 'd') {
      refRadioDebit.current.checked = true;
    }
    else {
      refRadioKredit.current.checked = true;
    }
    setMode(1)
  }

  const buttonTambah = async () => {
    if (mode === 1) {
      resetInput();
      refRadioDebit.current.checked = false;
      refRadioKredit.current.checked = false;
      setMode(0);
    }
    else {
      if (dataInput.id === 'new') {
        const checked = checkValueInput(dataInput);
        if (checked === 'uang') {
          ModalError('Lengkapi Seluruh Form', 'Isi Form Uang')
          refInputUang.current.focus()
        }
        else if (checked === 'jenis') {
          ModalError('Lengkapi Seluruh Form', 'Pilih Salah Satu Debit atau Kredit')
          refRadioDebit.current.checked = false;
          refRadioKredit.current.checked = false;
        }
        else if (checked === 'keterangan') {
          ModalError('Lengkapi Seluruh Form', 'Isi Form Keterangan')
          refInputKeterangan.current.focus()
        }
        else {
          const res = await newData(dataInput);
          // console.log(dataInput)
          if (res.data) {
            ModalSuccess('Success', 'Data Berhasil ditambahkan')
            setLoading(true);
            resetInput();
            setRefresh(!refresh);
          }
          else if (res.error) {
            console.log(res.error)
            ModalError('Terjadi Kesalahan', 'Data Gagal Ditambahakan')
          }
        }
      }
      else {
        ModalError('Terjadi Kesalahan', '')
        resetInput()
      }
    }
  }

  const buttonHapus = () => {
    if (dataInput.id !== 'new') {
      const checked = checkValueInput(dataInput);
      if (checked === 'uang') {
        ModalError('Lengkapi Seluruh Form', 'Isi Form Uang')
        refInputUang.current.focus()
      }
      else if (checked === 'jenis') {
        ModalError('Lengkapi Seluruh Form', 'Pilih Salah Satu Debit atau Kredit')
        refRadioDebit.current.checked = false;
        refRadioKredit.current.checked = false;
      }
      else if (checked === 'keterangan') {
        ModalError('Lengkapi Seluruh Form', 'Isi Form Keterangan')
        refInputKeterangan.current.focus()
      }
      else {
        MySwal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda Ingin Menghapus Data ini',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak'
        }).then(async (res) => {
          if (res.isConfirmed) {
            const confirmedData = await deleteData(dataInput);
            if (confirmedData.data) {
              ModalSuccess('Success', 'Data Berhasil dihapus');
              setLoading(true);
              resetInput();
              setRefresh(!refresh);
              setMode(0)
            }
            else if (confirmedData.error) {
              ModalError('Terjadi Kesalahan', 'Data Gagal dihapus');
            }
          }
        })
      }
    }
    else {
      ModalError('Terjadi Kesalahan', '')
      resetInput()
    }
  }

  const buttonEdit = async () => {
    if (dataInput.id !== 'new') {
      const checked = checkValueInput(dataInput);
      if (checked === 'uang') {
        ModalError('Lengkapi Seluruh Form', 'Isi Form Uang')
        refInputUang.current.focus()
      }
      else if (checked === 'jenis') {
        ModalError('Lengkapi Seluruh Form', 'Pilih Salah Satu Debit atau Kredit')
        refRadioDebit.current.checked = false;
        refRadioKredit.current.checked = false;
      }
      else if (checked === 'keterangan') {
        ModalError('Lengkapi Seluruh Form', 'Isi Form Keterangan')
        refInputKeterangan.current.focus()
      }
      else {
        const res = await editData(dataInput);
        if (res.data) {
          ModalSuccess('Success', 'Data Berhasil diubah');
          setLoading(true);
          resetInput();
          setRefresh(!refresh);
          setMode(0);
        }
        else if (res.error) {
          ModalError('Terjadi Kesalahan', 'Data Gagal diubah');
        }
      }
    }
    else {
      ModalError('Terjadi Kesalahan', '')
      resetInput()
    }
  }

  // const buttonTest = () => {
  //   console.log(dataInput)
  // }



  useEffect(() => {
    document.title = 'Data Uang Kuliah';
    const fetchData = async () => {
      const res = await getData();
      if (res.data) {
        setData(res.data);
        setLoading(false);
      }
      else if (res.error) {
        console.log(res.error);
      }
    }
    fetchData();
  }, [refresh])

  if (isLoading) {
    return (
      <div className="App h-screen">
        <div className='flex flex-col flex-wrap justify-center content-center h-screen'>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
          <p className='text-center text-white mt-2 text-2xl'>Loading ....</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App h-screen">
      <h1 className='text-center text-white text-3xl'>Data Uang Kuliah</h1>
      <div className='bg-blue-300 mt-2' style={{ minHeight: 500, maxHeight: 'auto' }}>
        <div className="py-5 flex flex-row mx-10">
          <div className='w-full'>
            <table className='table-fixed'>
              <thead className='bg-white'>
                <tr>
                  <th className="border border-black text-lg w-40">Tanggal</th>
                  <th className="border border-black text-lg w-40">Masuk</th>
                  <th className="border border-black text-lg w-40">Keluar</th>
                  <th className="border border-black text-lg w-40">Jumlah</th>
                  <th className="border border-black text-lg w-60">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <TableRow data={item} onClick={editOrDelete} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col w-auto mx-3 bg-white' style={{height: 340}} >
            <h3 className='text-xl text-black font-bold underline mx-2 text-center'>{mode === 0 ? 'Tambah' : 'Edit/Hapus'} Data</h3>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-row mx-2 hidden'>
                <div className='flex w-64 items-center'>
                  <p className='text-lg'>ID</p>
                </div>
                <div className='w-full'>
                  <Input inputType={'text'} name={'id'} value={dataInput} setter={setDataInput} ref={refInputId} />
                </div>
              </div>
              <div className='flex flex-row mx-2'>
                <div className='flex w-64 items-center'>
                  <p className='text-lg'>Tanggal</p>
                </div>
                <div className='w-full'>
                  <Input inputType={'tanggal'} name={'tanggal'} value={dataInput} setter={setDataInput} ref={refInputTanggal} />
                </div>
              </div>
              <div className='flex flex-row mx-2'>
                <div className='flex w-64 items-center'>
                  <p className='text-lg'>Jumlah Uang</p>
                </div>
                <div className='w-full'>
                  <Input inputType={'number'} name={'uang'} value={dataInput} setter={setDataInput} ref={refInputUang} />
                </div>
              </div>
              <div className='flex flex-row mx-2'>
                <div className='flex w-64 items-center'>
                  <label className='text-lg'>Masuk/Keluar</label>
                </div>
                <div className='w-full'>
                  <input className='mx-1' name={'type'} onChange={handleRadioChange} type={'radio'} ref={refRadioDebit} value={'debit'} />
                  <label className='mr-4'>Masuk</label>
                  <input className='mx-1' name={'type'} onChange={handleRadioChange} type={'radio'} ref={refRadioKredit} value={'kredit'} />
                  <label>Keluar</label>
                </div>
              </div>
              <div className='flex flex-row mx-2'>
                <div className='flex w-64 items-center'>
                  <label className='text-lg'>Keterangan</label>
                </div>
                <div className='w-full'>
                  <Input inputType={'text'} name={'keterangan'} value={dataInput} setter={setDataInput} ref={refInputKeterangan} />
                </div>
              </div>
              <div className='flex flex-row'>
                <FormButton btnStyle={'Primary'} text={mode === 0 ? 'Simpan Data' : 'Tambah Data Baru'} onClickHandler={buttonTambah} />
              </div>
              {mode === 1 &&
                <div className='flex flex-row'>
                  <FormButton btnStyle={'Success'} text={'Edit'} onClickHandler={buttonEdit} />
                  <FormButton btnStyle={'Danger'} text={'Hapus'} onClickHandler={buttonHapus} />
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
