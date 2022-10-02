//ImportComponent

import { GridComponent } from "./grid/grid.component";
import { ListPageComponent } from "./list-page/list-page.component";
import { TextInputComponent } from "./text-input/text-input.component";

import { InputErrorPipe } from "./text-input/input.error.pipe";
import { TextareaInputComponent } from "./textarea-input/textarea-input.component";
import { FormPageComponent } from "./form-page/form-page.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { LoadingComponent } from "./loading/loading.component";
import { ComboboxComponent } from "./combobox/combobox.component";

export const RootComponentsShared = [
    GridComponent,
    ListPageComponent,
    TextInputComponent,
    TextareaInputComponent,
    FormPageComponent,
    CheckboxComponent,
    LoadingComponent,
    ComboboxComponent
];


export const RootComponentPipesShared = [
    InputErrorPipe
];
