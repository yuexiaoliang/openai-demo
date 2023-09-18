import { startChat } from './apis/chat'
import { generateImages, createImageVariation, onEditFileChange, onVariationFileChange } from './apis/images';
import { createFineTuningJob, getFinTuningJobs, cancelFinTuningJob } from './apis/fineTuning'
import { queryFiles } from './apis/files'


// startChat();

generateImages(`A photo of a Samoyed dog with its tongue out hugging a white Siamese cat`)

const fileVariation = document.querySelector('#file-variation-upload');
fileVariation.addEventListener('change', onVariationFileChange);

const fileEdit = document.querySelector('#file-edit-upload');
fileEdit.addEventListener('change', onEditFileChange);
