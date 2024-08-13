import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteList } from "./FavoriteList";

export default function FavoritesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes favoris</CardTitle>
      </CardHeader>
      <CardContent>
        <FavoriteList />
      </CardContent>
    </Card>
  );
}
