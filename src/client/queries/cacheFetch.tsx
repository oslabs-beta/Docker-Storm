
 
const fetchFunction = async () => {

  const result = await fetch('/user/cached', {
    headers: {
      'content-type': 'application/json'
    },
  });

  

  return result.json();
};

export default fetchFunction;