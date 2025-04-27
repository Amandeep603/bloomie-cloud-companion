
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ColorOption = {
  name: string;
  bgClass: string;
  textClass: string;
};

const colorOptions: ColorOption[] = [
  { name: "Purple", bgClass: "bg-bloomie-purple", textClass: "text-white" },
  { name: "Pink", bgClass: "bg-bloomie-pink", textClass: "text-foreground" },
  { name: "Yellow", bgClass: "bg-bloomie-yellow", textClass: "text-foreground" },
  { name: "Green", bgClass: "bg-bloomie-green", textClass: "text-foreground" },
  { name: "Blue", bgClass: "bg-bloomie-blue", textClass: "text-foreground" },
];

const faceOptions = ["😊", "😎", "🥰", "😄", "😌"];

const AvatarCustomizer = () => {
  const [avatarColor, setAvatarColor] = useState<ColorOption>(colorOptions[0]);
  const [avatarFace, setAvatarFace] = useState<string>(faceOptions[0]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 animate-float">
          <div className="w-40 h-40 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className={`w-36 h-36 md:w-56 md:h-56 ${avatarColor.bgClass} rounded-full flex items-center justify-center`}>
              <div className={`${avatarColor.textClass} text-6xl md:text-8xl font-nunito`}>{avatarFace}</div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Bloomie</h2>
        <p className="text-muted-foreground text-center">
          Customize your AI companion to match your style!
        </p>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-xl mb-4">Choose a color</h3>
          <RadioGroup defaultValue="purple" className="grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <div key={color.name} className="flex flex-col items-center space-y-2">
                <Label
                  htmlFor={`color-${color.name}`}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${color.bgClass} ${
                      avatarColor.name === color.name
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setAvatarColor(color)}
                  ></div>
                  <span className="text-xs mt-1">{color.name}</span>
                </Label>
                <RadioGroupItem
                  value={color.name}
                  id={`color-${color.name}`}
                  className="sr-only"
                />
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-4">Choose an expression</h3>
          <RadioGroup defaultValue={faceOptions[0]} className="grid grid-cols-5 gap-2">
            {faceOptions.map((face) => (
              <div key={face} className="flex items-center justify-center">
                <Label
                  htmlFor={`face-${face}`}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl ${
                      avatarFace === face
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setAvatarFace(face)}
                  >
                    {face}
                  </div>
                </Label>
                <RadioGroupItem
                  value={face}
                  id={`face-${face}`}
                  className="sr-only"
                />
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Button className="w-full">Save Changes</Button>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
