"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ProfileAddress({
  address,
}: {
  address?: {
    company: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
}) {
  const [company, setCompany] = useState(address?.company ?? "");
  const [street, setStreet] = useState(address?.street ?? "");
  const [city, setCity] = useState(address?.city ?? "");
  const [state, setState] = useState(address?.state ?? "");
  const [country, setCountry] = useState(address?.country ?? "");
  const trpcUtils = api.useUtils();

  const saveAddress = api.profile.saveAddress.useMutation({
    onSuccess: async () => {
      // Invalidate the profile query to refetch the updated address
      await trpcUtils.profile.getProfile.invalidate();
    },
  });

  const handleSubmit = () => {
    // Save the address
    saveAddress.mutate({ company, street, city, state, country });
  };

  const canSubmit = street && city && state && country;

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={company}
          type="text"
          placeholder="Company"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          value={street}
          type="text"
          placeholder="1234 Main St"
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={city}
          type="text"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={state}
          type="text"
          placeholder="State"
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={country}
          type="text"
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        <Button onClick={() => handleSubmit()} disabled={!canSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
