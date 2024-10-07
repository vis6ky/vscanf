# vscanf

vscanf is a function created to help javascript developer to format the string dynamically likewise we do in c & php with printf & scanf.
<br />
written in typescript.

## Installation

Use the package manager [npm] https://www.npmjs.com/ to install.
<br />
npm install @vis6ky/vscanf
<br />
import { vscanf } from '@vis6ky/vscanf'

## Function

vscanf(inputString, arguments)

### Note: 

firstParameter : Input String
<br />
secondParameter : replacable values separated by comma(,). type = (string | number)

## Example

let output = vscanf('My name is {s} and i am {s, 17}, age {n} and i earn {n,inr,true}', 'Vishal', 'Software Engineer in AnyWhere', 30, 50000)

### specifier

{s} => replacebale string placeholder
<br />
{s, 10} => replacebale string placeholder which also use substring of the value where starting index is 0 and ending index is 10
<br />
{s, 5, 20} => replacebale string placeholder which also use substring of the value where starting index is 5 and ending index is 10
<br />
{n} => replacebale number placeholder
<br />
{n, usd} => replacebale number placeholder which also can be formatted as per currency number formatting
<br />
{n, usd, true} => replacebale number placeholder which also can be formatted as per currency number formatting and also add currency symbol
<br />
InputString = 'My name is {s} and i am {s, 17}, age {n} and i earn {n,inr,true}'
<br />
Arguments = 'Vishal', 'Software Engineer in AnyWhere', 30, 50000

### Output

My name is Vishal and i am Software Engineer, age 30 and i earn ₹50,000.00

### More Example

vscanf('My Roll Number is {n}', 102020302010)
<br />
=> My Roll Number is 102020302010

vscanf('https://www.google.com/search?q={s}', 'dubai')
<br />
=> https://www.google.com/search?q=dubai

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
