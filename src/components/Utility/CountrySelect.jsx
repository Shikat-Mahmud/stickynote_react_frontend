import { useEffect, useState } from "react";
import axios from "axios";

export default function CountrySelect({ value, onChange }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const sorted = res.data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      } catch (error) {
        console.error("Failed to load countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return "🏳️";
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  };

  return (
    <div>
      {loading ? (
        <select
          disabled
          className="w-full border rounded-lg p-2 focus:outline-none text-gray-500"
        >
          <option>Loading countries...</option>
        </select>
      ) : (
        <select
          id="country"
          name="country"
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {getFlagEmoji(country.code)} {country.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}