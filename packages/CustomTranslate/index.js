const translations = {
  'Activate the hand tool': 'Mover',
  'Activate the lasso tool': 'Selecionar',
  'Activate the create/remove space tool': 'Espaçamento',
  'Activate the global connect tool': 'Conexão',
  'Create EndEvent': 'Fim',
  'Create StartEvent': 'Início',
  'Create Gateway': 'Decisão',
  'Create UserTask': 'Etapa',
  'Create sendMessage': 'Enviar mensagem',
  'Open minimap': 'MAPA',
  'Close minimap': 'FECHAR',
  'Append UserTask': 'Etapa',
  'Append Gateway': 'Decisão',
  'Remove': 'Remover',
  'Append Sequence': 'Sequência',
  'Append EndEvent': 'Fim',
  'Append StartEvent': 'Início'
}

export default function customTranslate (template, replacements) {
  replacements = replacements || {};

  // Translate
  template = translations[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements[key] || '{' + key + '}';
  });
}
