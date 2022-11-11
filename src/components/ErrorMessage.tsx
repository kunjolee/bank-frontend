import { Box, Typography } from '@mui/material';
import { IError } from '../interfaces';

interface Props {
    error: IError 
}

const ErrorMessage = ({ error }: Props) => {
    const { message, status, statusText } = error;
  return (
    <Box mt={2}>
        <Typography color='primary' variant='subtitle2' textAlign='center'>
            Error: {status}: {message}
        </Typography> 
        <Typography color='primary' variant='subtitle2' textAlign='center'>
            {statusText}
        </Typography> 
    </Box>
  )
}
export default ErrorMessage