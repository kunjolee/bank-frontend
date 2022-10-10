import { useSnackbar, VariantType } from 'notistack';

export const useShowMessage = () => {
    const { enqueueSnackbar } = useSnackbar();

    return ( message: string, variant: VariantType ) => {

        enqueueSnackbar(message, {
            variant, 
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }
        });

    }
}