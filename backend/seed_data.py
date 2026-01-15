import sys
sys.path.append('.')

from app.database import SessionLocal
from app.models import User, Category, Podcast, Comment, Favorite
from app.utils import get_password_hash
from datetime import datetime

db = SessionLocal()

try:
    # Create categories
    categories_data = [
        {"name": "Technology", "description": "Tech news and gadgets"},
        {"name": "Business", "description": "Entrepreneurship and startups"},
        {"name": "Comedy", "description": "Humor and entertainment"},
        {"name": "Health & Fitness", "description": "Wellness and exercise"},
        {"name": "True Crime", "description": "Mystery and investigations"},
    ]
    
    categories = []
    for cat_data in categories_data:
        cat = db.query(Category).filter(Category.name == cat_data["name"]).first()
        if not cat:
            cat = Category(**cat_data)
            db.add(cat)
            db.flush()
        categories.append(cat)
    
    # Create sample users
    users_data = [
        {"username": "john_doe", "email": "john@example.com", "full_name": "John Doe"},
        {"username": "jane_smith", "email": "jane@example.com", "full_name": "Jane Smith"},
        {"username": "mike_wilson", "email": "mike@example.com", "full_name": "Mike Wilson"},
    ]
    
    users = []
    for user_data in users_data:
        user = db.query(User).filter(User.username == user_data["username"]).first()
        if not user:
            user = User(
                **user_data,
                hashed_password=get_password_hash("password123"),
                is_active=True
            )
            db.add(user)
            db.flush()
        users.append(user)
    
    # Create sample podcasts
    podcasts_data = [
        {
            "title": "The Evolution of the Laboratory",
            "description": "International Space Station leaders Laura Shaw and Jennifer Buchli discuss the science, discoveries, and innovations that have defined nearly 25 years aboard the orbiting laboratory.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION5363676886.mp3",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/13da4810-dc5e-11f0-b1e6-474d582f398b/image/329ad9812e8527f227847c467d58a3cd.png",
            "duration_seconds": 2577,
            "listen_count": 1250,
            "category_id": categories[0].id,
            "owner_id": users[0].id,
        },
        {
            "title": "Building the International Space Station",
            "description": "Former ISS program manager and Axiom Space co-founder Michael Suffredini reflects on the ambitious path to building the International Space Station and the lessons learned from a decade of leadership.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION8166537770.mp3",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/fb27e7c4-d6c1-11f0-9094-8fb427f0270f/image/a421b0835b32bd45f5cb4ad7e8971370.png",
            "duration_seconds": 4220,
            "listen_count": 890,
            "category_id": categories[0].id,
            "owner_id": users[1].id,
        },
        {
            "title": "CHAPEA Mission 2",
            "description": "The CHAPEA Mission 2 crew discusses their backgrounds and preparations for their upcoming yearlong analog Mars mission inside the Mars Dune Alpha habitat at NASA's Johnson Space Center.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION6020606381.mp3",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/2a2b7890-d15b-11f0-9f4c-cb49aa599544/image/d7e582a16e5794f606e07cf02c757ab9.png",
            "duration_seconds": 3578,
            "listen_count": 2100,
            "category_id": categories[0].id,
            "owner_id": users[2].id,
        },
        {
            "title": "Positive Impacts",
            "description": "NASA astronaut Chris Williams shares his journey exploring the early universe, cancer treatment techniques, and astronaut training before his first mission to the International Space Station.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION8717506981.mp3",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/fcc1c8c6-c6e4-11f0-ad52-1bc44641c353/image/691efe8a49fdb2b624b7d4a12d90cf89.png",
            "duration_seconds": 1414,
            "listen_count": 1560,
            "category_id": categories[3].id,
            "owner_id": users[0].id,
        },
        {
            "title": "Laser Communications",
            "description": "Space communication and navigation expert Jason Mitchell discusses laser communications and the ongoing work to understand what future deep space and near space missions might need. HWHAP Episode 313.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION1422168656.mp3?updated=1744296047",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/75d9f74c-6a1b-11ef-b8c9-b3f90a991fcc/image/19a71997826bba0a5343b90f1a6fdb39.jpeg",
            "duration_seconds": 3524,
            "listen_count": 3400,
            "category_id": categories[0].id,
            "owner_id": users[1].id,
        },
        {
            "title": "A Record-Breaking Astronaut",
            "description": "NASA astronaut Suni Williams reflects on her recent record-breaking mission on board the International Space Station.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION1498297395.mp3",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/9734478a-8441-11f0-ad8d-5b94411c56b2/image/455358b7044d79bf7bc294368f25f120.png",
            "duration_seconds": 3137,
            "listen_count": 980,
            "category_id": categories[0].id,
            "owner_id": users[2].id,
        },
        {
            "title": "Mars Audio Log #6",
            "description": "The CHAPEA crew gives an update as they hit their halfway mark of their yearlong mission, and human performance scientists discuss exercising in a simulated Mars habitat. This is the sixth audio log of a monthly series. HWHAP Episode 320.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION8937546912.mp3?updated=1744295456",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/734198be-6a1b-11ef-b8c9-47771a100629/image/23f9e5b1217e15918c7583b6fe427584.png",
            "duration_seconds": 4615,
            "listen_count": 0,
            "category_id": categories[0].id,
            "owner_id": users[0].id,
        },
        {
            "title": "Return of OREx: Part III",
            "description": "Planetary scientists and OSIRIS-REx co-investigators at NASA's Johnson Space Center walk us through the processes and emotions of working in the lab with asteroid Bennu's precious samples. HWHAP Episode 319.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION4674312865.mp3?updated=1744295459",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/739a1106-6a1b-11ef-b8c9-dfe35116163e/image/5538cf4334eee5966d3bf667a300a610.png",
            "duration_seconds": 4164,
            "listen_count": 0,
            "category_id": categories[0].id,
            "owner_id": users[1].id,
        },
        {
            "title": "Axiom Mission 3",
            "description": "Michael Lopez-Alegria, former NASA astronaut and current commander of Axiom Mission 3, discusses his career and the upcoming private astronaut mission to the International Space Station. HWHAP Episode 318.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION7260330661.mp3?updated=1744295384",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/73e49096-6a1b-11ef-b8c9-cfc1e63e3fa6/image/54afc7377ee7781efb3f81ab88c9b65f.png",
            "duration_seconds": 4058,
            "listen_count": 0,
            "category_id": categories[0].id,
            "owner_id": users[2].id,
        },
        {
            "title": "Peregrine Mission One",
            "description": "The CEO of Astrobotic and NASA Deputy Manager for Commercial Lunar Payload Services discuss Peregrine Mission One ahead of its launch and landing on the lunar surface. HWHAP Episode 317.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION3822867041.mp3?updated=1744295375",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/742ec7f6-6a1b-11ef-b8c9-4705f267bd33/image/cb147a826911a2e2569c80416e2f4fed.png",
            "duration_seconds": 3420,
            "listen_count": 0,
            "category_id": categories[0].id,
            "owner_id": users[0].id,
        },
        {
            "title": "Mars Audio Log #5",
            "description": "The CHAPEA crew gives an update in their fifth month of a one-year stay in a simulated Mars habitat and Dr. Suzanne Bell discusses behavioral health and performance of the analog mission. This is the fifth audio log of a monthly series. HWHAP Episode 316.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION6724353407.mp3?updated=1744295434",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/7479d840-6a1b-11ef-b8c9-2f3d979e60dc/image/97f7080d1c3f464639d139a0507402d3.png",
            "duration_seconds": 2738,
            "listen_count": 0,
            "category_id": categories[0].id,
            "owner_id": users[1].id,
        },
        {
            "title": "Space Biology",
            "description": "NASA scientist Dr. Sharmila Bhattacharya describes how space biology research can contribute to significant scientific and technological advancements that not only enable space exploration for future long duration space missions, but also benefits life on Earth. HWHAP Episode 315.",
            "audio_url": "https://traffic.megaphone.fm/NATIONALAERONAUTICSANDSPACEADMINISTRATION9249337615.mp3?updated=1744295472",
            "cover_image_url": "https://megaphone.imgix.net/podcasts/74ebfd94-6a1b-11ef-b8c9-c3c1364234f9/image/fe4c6d7b13e6edf751b2b477d9246be7.png",
            "duration_seconds": 3609,
            "listen_count": 0,
            "category_id": categories[0].id,
            "owner_id": users[2].id,
        },
    ]
    
    podcasts = []
    for pod_data in podcasts_data:
        pod = db.query(Podcast).filter(Podcast.title == pod_data["title"]).first()
        if not pod:
            pod = Podcast(**pod_data)
            db.add(pod)
            db.flush()
        podcasts.append(pod)
    
    # Create sample comments
    comments_data = [
        {"content": "Incredible insights into the ISS! The engineering behind it is mind-blowing.", "podcast_id": podcasts[0].id, "user_id": users[1].id},
        {"content": "As an aerospace engineer, this episode was pure gold. Thank you!", "podcast_id": podcasts[0].id, "user_id": users[2].id},
        {"content": "The collaboration between nations on the ISS is truly inspiring.", "podcast_id": podcasts[1].id, "user_id": users[0].id},
        {"content": "Michael Suffredini's leadership lessons are applicable to any field. Great episode!", "podcast_id": podcasts[1].id, "user_id": users[2].id},
        {"content": "Can't wait to follow the CHAPEA Mission 2 crew's journey!", "podcast_id": podcasts[2].id, "user_id": users[1].id},
        {"content": "The Mars habitat simulation is such important research for future missions.", "podcast_id": podcasts[2].id, "user_id": users[0].id},
        {"content": "Chris Williams' story is so motivating. From cancer research to space!", "podcast_id": podcasts[3].id, "user_id": users[2].id},
        {"content": "Love hearing about astronauts' backgrounds before NASA.", "podcast_id": podcasts[3].id, "user_id": users[1].id},
        {"content": "Laser communications are the future of deep space missions! Jason Mitchell explained it perfectly.", "podcast_id": podcasts[4].id, "user_id": users[0].id},
        {"content": "The bandwidth improvements with laser comms are game-changing for space exploration.", "podcast_id": podcasts[4].id, "user_id": users[2].id},
        {"content": "Suni Williams is an absolute hero. Her dedication is unmatched.", "podcast_id": podcasts[5].id, "user_id": users[1].id},
        {"content": "Record-breaking missions like this push humanity forward. Amazing!", "podcast_id": podcasts[5].id, "user_id": users[0].id},
        {"content": "The halfway mark already! Time flies in the Mars habitat.", "podcast_id": podcasts[6].id, "user_id": users[2].id},
        {"content": "Exercise in simulated Mars gravity must be so challenging. Fascinating stuff!", "podcast_id": podcasts[6].id, "user_id": users[1].id},
        {"content": "The detail about Bennu's samples is incredible. Can't wait for the analysis results!", "podcast_id": podcasts[7].id, "user_id": users[0].id},
        {"content": "OSIRIS-REx is one of the most ambitious missions ever. So proud of the team!", "podcast_id": podcasts[7].id, "user_id": users[2].id},
        {"content": "Private astronaut missions are the future. Axiom is leading the way!", "podcast_id": podcasts[8].id, "user_id": users[1].id},
        {"content": "Michael Lopez-Alegria's experience is invaluable for commercial spaceflight.", "podcast_id": podcasts[8].id, "user_id": users[0].id},
        {"content": "Lunar missions are back! The Peregrine lander is such cool technology.", "podcast_id": podcasts[9].id, "user_id": users[2].id},
        {"content": "Commercial lunar payload services are revolutionizing space exploration.", "podcast_id": podcasts[9].id, "user_id": users[1].id},
        {"content": "Dr. Suzanne Bell's research on behavioral health is crucial for long missions.", "podcast_id": podcasts[10].id, "user_id": users[0].id},
        {"content": "The psychological aspects of Mars missions are just as important as the physical ones.", "podcast_id": podcasts[10].id, "user_id": users[2].id},
        {"content": "Space biology research has so many applications here on Earth. Mind-blowing!", "podcast_id": podcasts[11].id, "user_id": users[1].id},
        {"content": "Dr. Bhattacharya's work is paving the way for future deep space missions.", "podcast_id": podcasts[11].id, "user_id": users[0].id},
    ]
    
    for comment_data in comments_data:
        existing = db.query(Comment).filter(
            Comment.content == comment_data["content"],
            Comment.podcast_id == comment_data["podcast_id"]
        ).first()
        if not existing:
            comment = Comment(**comment_data)
            db.add(comment)
    
    # Create sample favorites
    favorites_data = [
        {"user_id": users[0].id, "podcast_id": podcasts[1].id},
        {"user_id": users[0].id, "podcast_id": podcasts[4].id},
        {"user_id": users[1].id, "podcast_id": podcasts[0].id},
        {"user_id": users[1].id, "podcast_id": podcasts[2].id},
        {"user_id": users[2].id, "podcast_id": podcasts[3].id},
    ]
    
    for fav_data in favorites_data:
        existing = db.query(Favorite).filter(
            Favorite.user_id == fav_data["user_id"],
            Favorite.podcast_id == fav_data["podcast_id"]
        ).first()
        if not existing:
            favorite = Favorite(**fav_data)
            db.add(favorite)
    
    db.commit()
    print("✅ Database seeded successfully!")
    print(f"Created {len(categories)} categories")
    print(f"Created {len(users)} users (password: password123)")
    print(f"Created {len(podcasts)} podcasts")
    print(f"Created {len(comments_data)} comments")
    print(f"Created {len(favorites_data)} favorites")
    
except Exception as e:
    print(f"❌ Error: {e}")
    db.rollback()
finally:
    db.close()
