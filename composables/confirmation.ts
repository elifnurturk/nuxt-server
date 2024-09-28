import {openDialog} from 'vue3-promise-dialog';
import ConfirmationDialog from "~/components/ConfirmationDialog.vue";

export async function confirmation(header?: string, text?: string) {
    return await openDialog(ConfirmationDialog, {header, text});
}