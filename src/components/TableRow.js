import { useRef } from "react"
import { convertDate, convertToRupiah } from "../function";

const TableRow = ({ data, onClick }) => {
    const rowRef = useRef();
    return (
        <tr className='bg-white hover:bg-gray-200 cursor-pointer' ref={rowRef} onClick={() => onClick(data)} id={data.id} name={'tableRow'}>
            <td className="text-center border border-black">{convertDate(data.tanggal)}</td>
            {data.jenis === 'D' ?
                <>
                    <td className="text-center border border-black">{convertToRupiah(data.uang)}</td>
                    <td className="text-center border border-black">-</td>
                </>
                :
                <>
                    <td className="text-center border border-black">-</td>
                    <td className="text-center border border-black">{convertToRupiah(data.uang)}</td>
                </>
            }
            <td className="text-center border border-black">{convertToRupiah(data.total)}</td>
            <td className="text-center border border-black">{data.keterangan}</td>
        </tr>
    )
}

export default TableRow