import LogoutButton from "@/components/logout-button/LogoutButton";
import styles from "./page.module.scss";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prisma";
import { getHydratedMovies } from "@/utils/movieClient";
import MediaCard from "@/components/media-card/MediaCard";

const ProfilePage = async (props) => {
  const { locale } = await props.params;

  const { user: userSession } = await getServerSession();

  const user = await prisma.user.findFirst({
    where: { email: userSession.email },
    include: {
      movieLikes: true,
    },
  });
  const idMovies = user?.movieLikes.map((movie) => movie.movieId) ?? [];
  const movies = await getHydratedMovies(idMovies);

  return (
    <div className={styles.profile}>
      <div className={styles.head}>
        <h1>Liste des films aimés</h1>
        <LogoutButton />
      </div>
      <div className={styles.list}>
        {(movies ?? []).map((movie, idx) => (
          <MediaCard media={movie} locale={locale} key={`profile-${movie.id}-${idx}`} likedMovies={idMovies} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
