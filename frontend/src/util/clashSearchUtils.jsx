export async function fetchData(
  prompt,
  type,
  setSearchResult,
  showAlert,
  scrollRef
) {
  try {
    let response;
    if (type === 'player') {
      response = await fetch(
        `http://localhost:3001/api/clash/players/${prompt}`
      );
    } else {
      const clanData = await getClanData(prompt);
      if (clanData !== null) {
        setSearchResult({ data: clanData, tab: type });
        return;
      } else {
        response = await fetch(
          `http://localhost:3001/api/clash/clans/search/${prompt}`
        );
      }
    }

    if (!response.ok) {
      handleErrors(response, type, prompt, showAlert);
      return;
    }

    const data = await response.json();
    if (data.items?.length === 0) {
      showAlert(`No ${type}(s) found with the entry of '${prompt}'.`, 'error');
      return;
    }

    setSearchResult({ data, tab: type });
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ top: -20 });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getClanData(clanTag) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/clash/clans/${clanTag}`
    );
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function handleErrors(response, type, prompt, showAlert) {
  if (response.status === 404) {
    showAlert(`No ${type}(s) found with the entry of '${prompt}'.`, 'error');
  } else if (response.status === 429) {
    showAlert(
      'The Clash of Clans API has too many requests right now.',
      'error'
    );
  } else {
    showAlert(
      `Failed to get ${type}'s data right now. Please try again later.`,
      'error'
    );
  }
}
