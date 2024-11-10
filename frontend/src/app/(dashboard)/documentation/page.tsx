import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Page = () => {
    return (
        <div className="container mx-auto space-y-6 p-6 bg-gradient-to-b from-orange-200 to-orange-400 rounded-lg">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">About Waaban</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="italic mb-4">
                        Waaban - Lighting the Path to Wellness, Even in Remote Communities
                    </p>
                    <p className="mb-4">
                        <strong>Introduction</strong> <br />
                        Waaban, inspired by the Ojibwe word for "morning light," symbolizes fresh starts, clarity, and a new dawn. Our mission is to illuminate the path toward better health, wellness, and community connection by empowering users with innovative tools and actionable insights.
                    </p>
                    <p className="mb-4">
                        Designed to address the unique challenges faced by remote and small communities, Waaban ensures that everyone—no matter where they are—has access to essential health guidance and resources. By leveraging AI-powered technology and community-focused care, Waaban brings personalized health support and public health management tools to underserved regions such as villages and remote areas.
                    </p>
                </CardContent>
            </Card>

            <Separator />

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        <strong>Personalized Health Assistance for Remote Areas</strong> <br />
                        Waaban uses advanced AI to offer personalized health and wellness recommendations. By inputting symptoms via phone calls, messages, or the app, users—especially in remote locations—receive accurate health insights and tailored guidance to improve their well-being.
                    </p>
                    <p className="mb-4">
                        <strong>Proactive Reminders and Actions</strong> <br />
                        Never miss an important health milestone, even in small communities. Waaban sends timely reminders and recommended actions based on individual health data, helping villages and underserved areas stay on track with public health needs.
                    </p>
                    <p className="mb-4">
                        <strong>Data-Driven Community Insights</strong> <br />
                        Waaban goes beyond individual care by providing community-level insights into common health trends in specific regions, including remote villages. This empowers local leaders and healthcare workers to address public health challenges collectively and with data-driven precision.
                    </p>
                    <p className="mb-4">
                        <strong>Bridging the Gap in Healthcare Access</strong> <br />
                        Waaban serves as a bridge for rural and underserved areas to connect with healthcare providers, access vital resources, and manage public health initiatives. Our "ticket" system helps connect users to local doctors or nearby healthcare services, improving health outcomes for everyone.
                    </p>
                    <p>
                        <strong>Community Connection and Support</strong> <br />
                        Waaban strengthens community bonds by fostering connections among local resources, healthcare providers, and wellness groups. Remote areas benefit from collective wellness and support, ensuring no one is left behind.
                    </p>
                </CardContent>
            </Card>

            <Separator />

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        <strong>Step 1: Input Your Concerns</strong> <br />
                        Users can input their symptoms via phone calls, messages, or directly through the app, making it easy for people in remote villages to access Waaban. The AI processes this input to provide personalized health recommendations and next steps.
                    </p>
                    <p className="mb-4">
                        <strong>Step 2: AI-Generated Solutions for Small Communities</strong> <br />
                        Waaban's AI analyzes data to predict possible diagnoses and offers recommendations tailored to the unique needs of small communities. It can also create "tickets" to connect users with nearby healthcare professionals, even in rural or underserved areas.
                    </p>
                    <p>
                        <strong>Step 3: Stay on Track with Community Health Goals</strong> <br />
                        Receive proactive reminders and actionable steps tailored to individual and community health needs. Waaban supports remote locations by facilitating follow-ups, encouraging public health initiatives, and building strong community health connections.
                    </p>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Our Vision and Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        <strong>Vision</strong> <br />
                        To create a world where technology brings light to health challenges and empowers every community—no matter how remote—to achieve better health outcomes.
                    </p>
                    <p>
                        <strong>Mission</strong> <br />
                        Waaban is committed to making personalized health and wellness accessible to everyone, including underserved and remote communities. By blending cutting-edge AI with compassionate care, we empower individuals and communities to manage public health challenges, building stronger, healthier, and more connected societies.
                    </p>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Why Waaban Matters for Small Communities and Remote Locations?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 italic">Empowering Remote Communities</p>
                    <p className="mb-4">
                        Waaban extends its compassionate care to even the most remote villages and communities, providing tailored health guidance and support regardless of location.
                    </p>
                    <p className="mb-4 italic">Accessible Health Tools</p>
                    <p className="mb-4">
                        With simple inputs via phone calls or messages, Waaban ensures that even areas with limited internet access can benefit from AI-driven health insights.
                    </p>
                    <p className="mb-4 italic">Supporting Local Healthcare</p>
                    <p className="mb-4">
                        Our ticketing system connects remote users with nearby healthcare providers and resources, helping to bridge the gap in healthcare access for small communities.
                    </p>
                    <p className="mb-4 italic">Community-Level Impact</p>
                    <p className="mb-4">
                        Waaban identifies and addresses regional health trends, helping communities take collective action for better public health outcomes.
                    </p>
                    <p className="italic">Enhanced Public Health Management</p>
                    <p>
                        From timely reminders to community-specific health data insights, Waaban empowers local leaders to make informed decisions for the betterment of their people.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default Page;
