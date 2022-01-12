import TablePagination from '@mui/material/TablePagination';

type Props = {
  total: number,
  page: number,
  perPage: number,
  handleChange: (name: string, value: unknown) => void
}

export default function Pagination({
  total, page, perPage, handleChange,
}: Props) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    handleChange('page', newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleChange('perPage', parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={perPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[8, 16, 32, 64]}
    />
  );
}
