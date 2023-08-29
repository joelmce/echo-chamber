import html from '../../helpers/html.js';

function formField(name, { label = name, id = name, type, ...props } = {}) {
  if (name === 'email') type ??= 'email';
  if (name === 'password') type ??= 'password';
  type ??= 'text';

  return html({ class: 'list-item' }, [
    html('label', label, { for: id }),
    html('input', { name, id, type, ...props }),
  ]);
}

export default formField;
