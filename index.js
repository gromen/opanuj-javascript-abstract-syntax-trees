/*
 * Opanuj JavaScript - Przeprogramowani.pl
 * I. Fundamenty języka JavaScript
 *
 * Ćwiczenie 21 - "HTML String"
 */

/*
* Cel zadania
*------------
* To zadanie stanowi wstęp do projektu "Abstract Syntax Trees" https://przeprogramowani.pl/opanuj-javascript_ast.pdf. Zacznij od zapoznania się z jego wprowadzeniem i opisem.
*
* Twoim rozgrzewkowym zadaniem jest napisanie funkcji, która przekonwertuje pojedynczy obiekt AST na HTML String.
*
* Przykład: convertAstToHtmlString({ 
“nodeType”: “element”, 
“tagName”: “div”,
“attributes”: [ { “name”: “class”, “value”: “test” }],
“children”: [ “nodeType”: “text”, “value”: “Hello world!”]
}) => "<div class="test">Hello world!</div>"
* 
* 
*/

function convertAstToHtmlString(astObject) {
  const { tagName, attributes, children } = astObject;

  if (!tagName) {
    return astObject.value;
  }

  let childrenFormatted = '';
  let attributesFormatted = '';

  if (attributes && attributes.length > 0) {
    attributesFormatted = attributes.map((attribute) => `${attribute.name}="${attribute.value}"`).join(' ');
  }

  if (children && children.length > 0) {
    childrenFormatted = children.map((child) => convertAstToHtmlString(child)).join(' ');
  }
  console.log(`<${tagName} ${attributesFormatted}>${childrenFormatted}</${tagName}>`);
  return `<${tagName} ${attributesFormatted}>${childrenFormatted}</${tagName}>`;
}

/* Weryfikacja */
function verify(input, goal) {
  input = Array.isArray(input) ? `[${input.join(', ')}]` : input;
  if (input === goal) {
    console.log('Gratulacje!');
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}
verify(
  convertAstToHtmlString({
    nodeType: 'element',
    tagName: 'div',
    attributes: [
      {
        name: 'class',
        value: 'profile',
      },
    ],
    children: [
      {
        nodeType: 'element',
        tagName: 'img',
        attributes: [
          {
            name: 'class',
            value: 'profile__avatar',
          },
          {
            name: 'src',
            value: 'https://www.thispersondoesnotexist.com/image',
          },
          {
            name: 'alt',
            value: 'Avatar',
          },
        ],
      },
      {
        nodeType: 'element',
        tagName: 'div',
        attributes: [
          {
            name: 'class',
            value: 'profile__details',
          },
        ],
        children: [
          {
            nodeType: 'element',
            tagName: 'p',
            attributes: [
              {
                name: 'class',
                value: 'profile__name',
              },
            ],
            children: [
              {
                nodeType: 'text',
                value: 'John Doe',
              },
            ],
          },
          {
            nodeType: 'element',
            tagName: 'p',
            attributes: [
              {
                name: 'class',
                value: 'profile__phone',
              },
            ],
            children: [
              {
                nodeType: 'text',
                value: '+48 123 456 789',
              },
            ],
          },
          {
            nodeType: 'element',
            tagName: 'p',
            attributes: [
              {
                name: 'class',
                value: 'profile__link',
              },
            ],
            children: [
              {
                nodeType: 'element',
                tagName: 'a',
                attributes: [
                  {
                    name: 'href',
                    value: 'https://przeprogramowani.pl/o-nas',
                  },
                ],
                children: [
                  {
                    nodeType: 'text',
                    value: 'Zobacz więcej',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }),
  '<div class="test">Hello world!</div>'
);
