import Banner from './Banner';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [fromInput, fromInputSet] = useState('');
  let [toInput, toInputSet] = useState('');
  let [dateInput, dateInputSet] = useState('');
  let [passInput, passInputSet] = useState<number | undefined>();

  useEffect(() => {
    fromInputSet(searchParams.get('from') || '');
    toInputSet(searchParams.get('to') || '');
    dateInputSet(searchParams.get('date') || '');
    passInputSet(Number(searchParams.get('pass')) || undefined);
  }, []);

//   useEffect(() => {
//     fetch("/api")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             items: result.items
//           });
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       )
//   }, []);

  return (
    <Banner>
      <SearchForm
        from={fromInput}
        to={toInput}
        date={dateInput}
        pass={passInput}
      />
      {/* <SearchResults /> */}
    </Banner>
  );
}
