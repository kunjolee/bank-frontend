import { TableRow, TableCell } from "@mui/material"

interface Props {
    history: any
}

const HistoryRow = ({ history }: Props) => {

    const { id, description, type: movement, amount, category, myDate } = history;
    
    return (
    <TableRow>              
        <TableCell>{ id }</TableCell>
        <TableCell>{ description }</TableCell>
        <TableCell>{ movement }</TableCell>
        <TableCell>{ amount }</TableCell>
        <TableCell>{ category }</TableCell>
        <TableCell>{ myDate }</TableCell>
    </TableRow>
  )
}
export default HistoryRow