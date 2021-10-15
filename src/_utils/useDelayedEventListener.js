let fireCount = 0;
let timerId = null;

export const useDelayedEventListener = (callback, delay) => {
  fireCount++;

  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    callback(fireCount);
    fireCount = 0;
    timerId = null;
  }, delay);
}

export default useDelayedEventListener;