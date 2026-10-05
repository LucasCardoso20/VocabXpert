// i18next-parser.config.js
module.exports = {
  createOldCatalogs: false, // Não cria arquivos de catálogo antigos
  keySeparator: '.', // Separador de chaves (ex: "common.title")
  locales: ['en', 'pt'], // Os idiomas que você suporta
  namespaceSeparator: ':', // Separador de namespace (se você usar, ex: "ns:key")
  output: 'src/i18n/locales/$LOCALE.json', // Onde os arquivos JSON serão gerados/atualizados
  input: [
    'app/**/*.{js,jsx,ts,tsx}', // Onde o parser deve procurar por chaves (suas views)
    'src/**/*.{js,jsx,ts,tsx}', // Outras pastas onde você pode ter traduções
  ],
  defaultNamespace: 'translation', // Namespace padrão (se não for especificado)
  lexers: {
    jsx: ['JsxLexer'],
    ts: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer'],
  },
  // Opcional: Se você tiver chaves que não são strings literais, pode usar o transform
  // transform: function customTransform(file, enc, done) {
  //   const parser = this.parser;
  //   const content = fs.readFileSync(file.path, enc);
  //   parser.set= {
  //     ...parser.options,
  //     keyAsDefaultValue: true, // Usa a chave como valor padrão se a tradução estiver vazia
  //     // Você pode adicionar mais opções aqui se precisar
  //   };
  //   parser.parse(content, function (err, result) {
  //     if (err) {
  //       return done(err);
  //     }
  //     done(null, result);
  //   });
  // },
};