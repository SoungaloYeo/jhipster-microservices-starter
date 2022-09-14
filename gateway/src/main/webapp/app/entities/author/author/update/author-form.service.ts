import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAuthor, NewAuthor } from '../author.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAuthor for edit and NewAuthorFormGroupInput for create.
 */
type AuthorFormGroupInput = IAuthor | PartialWithRequiredKeyOf<NewAuthor>;

type AuthorFormDefaults = Pick<NewAuthor, 'id'>;

type AuthorFormGroupContent = {
  id: FormControl<IAuthor['id'] | NewAuthor['id']>;
  name: FormControl<IAuthor['name']>;
  handle: FormControl<IAuthor['handle']>;
};

export type AuthorFormGroup = FormGroup<AuthorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AuthorFormService {
  createAuthorFormGroup(author: AuthorFormGroupInput = { id: null }): AuthorFormGroup {
    const authorRawValue = {
      ...this.getFormDefaults(),
      ...author,
    };
    return new FormGroup<AuthorFormGroupContent>({
      id: new FormControl(
        { value: authorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(authorRawValue.name, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      handle: new FormControl(authorRawValue.handle, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
    });
  }

  getAuthor(form: AuthorFormGroup): IAuthor | NewAuthor {
    return form.getRawValue() as IAuthor | NewAuthor;
  }

  resetForm(form: AuthorFormGroup, author: AuthorFormGroupInput): void {
    const authorRawValue = { ...this.getFormDefaults(), ...author };
    form.reset(
      {
        ...authorRawValue,
        id: { value: authorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AuthorFormDefaults {
    return {
      id: null,
    };
  }
}
